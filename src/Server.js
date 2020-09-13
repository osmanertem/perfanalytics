const express = require("express");
const bodyParser = require('body-parser');
const ERRORS = require("./ERRORS.json");

const PORT = process.env.PORT || 8080;

module.exports = function (_analyticsManager) {

  let http;
  let app;
  let serverHandle;
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
      const errorMsg = error || ERRORS.COULD_NOT_ADD_ANALYTICS_RESULT;
      res.status(errorMsg.httpStatusCode || 500).send(errorMsg);
    });
  }

  function handleCreateSite(req, res) {
    analyticsManager.createSite(req.body.siteUrl).then(createdSiteId => {
      res.send(createdSiteId);
    }).catch(error => {
      const errorMsg = error || ERRORS.COULD_NOT_CREATE_SITE;
      res.status(errorMsg.httpStatusCode || 500).send(errorMsg);
    });
  }

  function handleAddAnalyticsResult(req, res) {
    const reporterIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    analyticsManager.addAnalyticsResult(req.body.reportData, reporterIp).then(() => {
      res.send({ result: "OK" });
    }).catch(error => {
      const errorMsg = error || ERRORS.COULD_NOT_ADD_ANALYTICS_RESULT;
      res.status(errorMsg.httpStatusCode || 500).send(errorMsg);
    });
  }

  function handleGetAnalyticsData(req, res) {
    let t0 = new Date();
    analyticsManager.getAnalyticsData(req.query.siteId, req.query.startTime, req.query.endTime).then(results => {
      const calculationDuration = (Date.now() - t0.getTime());
      console.log("Analytics calculation duration " + calculationDuration + " ms");

      res.send(results);
    }).catch(error => {
      const errorMsg = error || ERRORS.UNKNOWN_ERROR;
      res.status(errorMsg.httpStatusCode || 500).send(errorMsg);
    });
  }

  main();
};