const { MongoClient } = require("mongodb");

let dbConnection;
let uri =
  "mongodb+srv://Needless123:Needless123@needless.pbcw2i1.mongodb.net/?appName=Needless";
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => {
    return dbConnection;
  },
};
