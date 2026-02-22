const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

connectDB();
