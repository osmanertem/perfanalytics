const express = require("express");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

module.exports = function (_recordManager) {

  let http;
  let app;

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

    http.listen(PORT, function () {
      console.log("✅ HTTPServer initialized on ", PORT);
    });
  }

  function registerEndPoints() {
    // app.post("/getData", handleGetData.bind(this));
  }

  // function handleGetData(req, res) {
  //   recordManager.getData(req.body.startDate, req.body.endDate, req.body.minCount, req.body.maxCount)
  //     .then((records) => {

  //       res.send({
  //         records,
  //         code: RESPONSE_CODES.SUCCESS.code,
  //         msg: RESPONSE_CODES.SUCCESS.msg
  //       });

  //     }).catch(error => {

  //       error = error || RESPONSE_CODES.UNKNOWN_ERROR;

  //       res.send({
  //         records: [],
  //         code: error.code,
  //         msg: error.msg
  //       });
  //     });
  // }

  main();
};