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
        result.builds.push({
          id: def.id,
          name: def.name,
          type: def.type,
          status: latestBuild.status,
          result: latestBuild.result,
          finishTime: latestBuild.finishTime
        });
      })
    );

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
