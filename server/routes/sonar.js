var express = require('express');
var router = express.Router();
var config = require('../config');
var axios = require('axios');

/* GET applications listing. */

router.get('/summary/:projectCode', async (req, res, next) => {
  try {
    const project = req.params.projectCode;
    let result = {
      qualityGate: await getQualityGate(project)
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

async function getQualityGate(projectKey) {
  const url =
    config.get('sonar.url') +
    `/api/qualitygates/project_status?projectKey=${projectKey}`;
  const qualityGateResponse = await axios.get(url, getAuthHearder());
  return qualityGateResponse.data.projectStatus.status; //ERROR, WARN, OK
}

module.exports = router;
