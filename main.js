const Server = require("./src/Server");
const dotenv = require("dotenv");

let serverInstance;

function main() {
  dotenv.config();
  serverInstance = new Server();
}

main();