const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");
// init app & mid ware
const app = express();

// db connection
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
    db = getDb();
  } else {
    console.log("Failed to connect to the database");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// route
app.get("/Books", (req, res) => {
  let books = [];
  db.collection("Books")
    .find() // returns a cursor so we direct it to an array
    .sort({ author: 1 }) // sort by author in ascending order
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get("/Books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("Books")
      .findOne({ _id: new ObjectId(req.params.id) }) // findOne returns a single document
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the document" });
      });
  } else {
    res.status(400).json({ error: "Invalid ID format" });
  }
});
