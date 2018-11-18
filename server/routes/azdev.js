var express = require("express");
var router = express.Router();
var config = require("../config");

var azdev = require("azure-devops-node-api");

//API definition URL: https://github.com/Microsoft/azure-devops-node-api/blob/master/api/BuildApi.ts

/* GET all projects */
router.get("/projects", async (req, res, next) => {
  try {
    const connection = getAzdevConnection();
    const api = await connection.getCoreApi();
    const projects = await api.getProjects();
    const result = projects.map(project => {
      return { id: project.id, code: project.name };
    });
    res.json(result);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e);
  }
});

/* GET project builds */
router.get("/builds/:projectCode", async (req, res, next) => {
  try {
    const project = req.params.projectCode;
    const connection = getAzdevConnection();
    const build = await connection.getBuildApi();
    const defs = await build.getDefinitions(project);

    const result = {
      project,
      builds: []
    };

    await Promise.all(
      defs.map(async def => {
        console.log(
          `> ID: ${def.id}, Name: ${def.name}, Type: ${
            def.type
          }, Queue status: ${def.queueStatus}`
        );
        let latestBuild = await build.getLatestBuild(project, def.id);
        if (latestBuild) {
          let status =
            latestBuild.status === 1
              ? "In progress"
              : latestBuild.status === 2
              ? "Completed"
              : "-";
          let buildResult =
            latestBuild.result === 2
              ? "Succeeded"
              : latestBuild.result === 4
              ? "PartiallySucceeded"
              : latestBuild.result === 8
              ? "Failed"
              : latestBuild.result === 32
              ? "Canceled"
              : "-";
          console.log(
            `=> Status: ${status}, Result: ${buildResult}, Finish: ${
              latestBuild.finishTime
            }`
          );
        }

        result.builds.push({
          id: def.id,
          name: def.name,
          type: def.type,
          status: latestBuild ? latestBuild.status : null,
          result: latestBuild ? latestBuild.result : null,
          finishTime: latestBuild ? latestBuild.finishTime : null
        });
      })
    );

    res.json(result);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e);
  }
});

/* GET project releases */
router.get("/releases/:projectCode", async (req, res, next) => {
  try {
    const project = req.params.projectCode;
    const connection = getAzdevConnection();
    const api = await connection.getReleaseApi();

    const getDeployments = await api.getDeployments(project);
    // const getDefinitionEnvironments = await api.getDefinitionEnvironments(
    //   project,
    //   "1",
    //   []
    // );
    // const getDeploymentsForMultipleEnvironments = await api.getDeploymentsForMultipleEnvironments(
    //   project
    // );
    // const getReleases = await api.getReleases(project);
    //const getLatestBuild = await api.getLatestBuild(project);
    const getReleaseDefinitions = await api.getReleaseDefinitions(project);

    // const result2 = {
    //   project,
    //   //getDefinitionEnvironments,
    //   getDeployments,
    //   //getDefinitionEnvironments
    //   getDeploymentsForMultipleEnvironments,
    //   getReleases,
    //   getReleaseDefinitions
    //   //getLatestBuild
    // };

    const releases = getReleaseDefinitions.map(release => {
      return { id: release.id, name: release.name };
    });

    let result = {
      project,
      releases: []
    };

    getReleaseDefinitions.forEach(releaseDefinition => {
      var environmentNames = [];
      let release = {
        name: releaseDefinition.name,
        environments: []
      };
      let env = getDeployments.map(deployment => {
        if (!environmentNames.includes(deployment.releaseEnvironment.name)) {
          environmentNames.push(deployment.releaseEnvironment.name);
        }
        return {
          name: deployment.releaseEnvironment.name,
          release: deployment.release.name,
          version:
            deployment.release.artifacts[0].definitionReference.version.name,
          deploymentStatus: deployment.deploymentStatus, //1:NotDeployed, 2:InProgress, 4:Succeeded, 8:PartiallySucceeded, 16:Failed
          completedOn: deployment.completedOn
        };
      });

      environmentNames.forEach(environmentName => {
        release.environments.push(
          env.filter(i => i.name == environmentName)[0]
        );
      });

      result.releases.push(release);
    });

    res.json(result);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e);
  }
});

// Get Azure DevOps API connection
function getAzdevConnection() {
  const orgUrl = config.get("azdev.url");
  const token = config.get("azdev.token");

  const authHandler = azdev.getPersonalAccessTokenHandler(token);
  return new azdev.WebApi(orgUrl, authHandler);
}

module.exports = router;
