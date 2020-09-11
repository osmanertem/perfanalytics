const express = require("express");
const bodyParser = require('body-parser');
const ERRORS = require("./ERRORS.json");

const PORT = process.env.PORT || 8080;

module.exports = function (_analyticsManager) {

  let http;
  let app;
  let analyticsManager = _analyticsManager;

  function main() {
    console.log("⚙️  Initializing HTTPServer");
    initHttpServer();
  }

  function initHttpServer() {
    app = express();
    http = require("http").Server(app);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use("/", express.static("./public"));
    registerEndPoints();
  }

  this.listen = function () {
    return new Promise(resolve => {
      serverHandle = http.listen(PORT, function () {
        console.log("✅ HTTPServer initialized on ", PORT);
        resolve(serverHandle);
      });
    });
  }

  function registerEndPoints() {
    app.get("/getSites", handleGetSites.bind(this));
    app.post("/createSite", handleCreateSite.bind(this));

    app.get("/getAnalyticsData", handleGetAnalyticsData.bind(this));
    app.post("/addAnalyticsResult", handleAddAnalyticsResult.bind(this));
  }

  function handleGetSites(req, res) {
    analyticsManager.getSites().then(sites => {
      res.send(sites);
    }).catch(error => {
      const errorMsg = ERRORS[error] || ERRORS.COULD_NOT_ADD_ANALYTICS_RESULT;
      res.status(500).send(errorMsg);
    });
  }

  function handleCreateSite(req, res) {
    analyticsManager.createSite(req.body.siteUrl).then(createdSiteId => {
      res.send(createdSiteId);
    }).catch(error => {
      const errorMsg = ERRORS[error] || ERRORS.COULD_NOT_CREATE_SITE;
      res.status(500).send(errorMsg);
    });;
  }

  function handleAddAnalyticsResult(req, res) {
    analyticsManager.addAnalyticsResult(res.body.reportData).then(() => {
      res.send("OK");
    }).catch(error => {
      const errorMsg = ERRORS[error] || ERRORS.COULD_NOT_ADD_ANALYTICS_RESULT;
      res.status(500).send(errorMsg);
    });
  }

  function handleGetAnalyticsData(req, res) {
    analyticsManager.getAnalyticsData(res.body.siteId, res.body.startTime, res.body.endTime).then(results => {
      res.send(results);
    }).catch(error => {
      const errorMsg = ERRORS[error] || ERRORS.UNKNOWN_ERROR;
      res.status(500).send(errorMsg);
    });
  }

  main();
};