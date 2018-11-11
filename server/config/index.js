var convict = require("convict");

var config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development"],
    default: "development",
    env: "NODE_ENV"
  },
  sonar: {
    url: {
      doc: "SonarQube API base URL",
      format: "url",
      default: ""
    },
    username: {
      doc: "SonarQube API username",
      format: String,
      default: ""
    },
    password: {
      doc: "SonarQube API password",
      format: String,
      default: "",
      sensitive: true
    }
  }
});

// Load environment dependent configuration
var env = config.get("env");
config.loadFile("./config/" + env + ".config.json");

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;
