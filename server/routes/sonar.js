var express = require('express');
var router = express.Router();
var config = require('../config');
var axios = require('axios');

/* GET applications listing. */

router.get('/summary/:projectCode', async (req, res, next) => {
  try {
    const project = req.params.projectCode;
    let result = {
      qualityGate: await getQualityGate(project),
      issues: await getIssuesCounts(project)
    };
    res.json(result);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e);
  }
});

function getAuthHearder() {
  return {
    auth: {
      username: config.get('sonar.username'),
      password: config.get('sonar.password')
    }
  };
}

//Get quality gate status
async function getQualityGate(projectKey) {
  const url =
    config.get('sonar.url') +
    `/api/qualitygates/project_status?projectKey=${projectKey}`;
  const qualityGateResponse = await axios.get(url, getAuthHearder());
  return qualityGateResponse.data.projectStatus.status; //ERROR, WARN, OK
}

async function getIssuesCounts(projectKey) {
  const url =
    config.get('sonar.url') +
    `/api/measures/component_tree?component=${projectKey}&metricKeys=blocker_violations,critical_violations,major_violations,minor_violations,info_violations&pageSize=1`;
  const issues = await axios.get(url, getAuthHearder());
  const measures = issues.data.baseComponent.measures;
  let result = { blocker: 0, critical: 0, major: 0, minor: 0, info: 0 };
  measures.forEach(measure => {
    switch (measure.metric) {
      case 'blocker_violations':
        result.blocker = measure.value;
        break;
      case 'critical_violations':
        result.critical = measure.value;
        break;
      case 'major_violations':
        result.major = measure.value;
        break;
      case 'minor_violations':
        result.minor = measure.value;
        break;
      case 'info_violations':
        result.info = measure.value;
        break;
    }
  });
  return result;
}

module.exports = router;
