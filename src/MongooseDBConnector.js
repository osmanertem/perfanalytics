const mongoose = require('mongoose');

module.exports = function () {

  let DBURI;
  function main() {
    const userName = process.env.DB_USER_NAME;
    const password = process.env.DB_PASSWORD;
    const dbServer = process.env.DB_SERVER;
    const dbName = process.env.DB_NAME;
    DBURI = `mongodb+srv://${userName}:${password}@${dbServer}/${dbName}?retryWrites=true`;
  }

  this.connectToDB = function () {
    return new Promise((resolve, reject) => {
      console.log("⚙️  Connecting to MongoDB");
      mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true });

      const db = mongoose.connection;
      db.on('error', (error) => {
        console.log("❌ Could not connec to MongoDB", error);
        reject(error);
      });
      db.once('open', () => {
        console.log("✅ Successfully connected to MongoDB");
        resolve()
      });
    });
  };

  this.disconnect = function () {
    mongoose.connection.close();
  };

  function isConnected() {
    return mongoose.connection && mongoose.connection.readyState === 1;
  }

  main();
};