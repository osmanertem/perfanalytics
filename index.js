const MongooseDBConnector = require("./src/MongooseDBConnector");
const AnalyticsManager = require("./src/AnalyticsManager");
const Server = require("./src/Server");
const dotenv = require("dotenv");

let serverInstance;
let mongooseDBConnector;
let analyticsManager;

function main() {
  dotenv.config();
  mongooseDBConnector = new MongooseDBConnector();

  mongooseDBConnector.connectToDB().then(() => {
    analyticsManager = new AnalyticsManager();
    serverInstance = new Server(analyticsManager);
    return serverInstance.listen();
  });
}

main();