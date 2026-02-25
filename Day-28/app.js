const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");
// init app & mid ware
const app = express();
app.use(express.json()); // for parsing application/json

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
  //pagenation
  const page = req.query.p || 0; // default to page 1 if not provided
  const booksPerPage = 3;

  let books = [];
  db.collection("Books")
    .find() // returns a cursor so we direct it to an array
    .sort({ author: 1 }) // sort by author in ascending order
    .skip(page * booksPerPage) // skip the appropriate number of documents
    .limit(booksPerPage) // limit the number of documents returned
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

app.post("/Books", (req, res) => {
  const book = req.body;

  db.collection("Books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json({ message: "Book added", id: result.insertedId });
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not add the book" });
    });
});

app.delete("/Books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("Books")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json({ message: "Book deleted" });
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete the book" });
      });
  } else {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

app.patch("/Books/:id", (req, res) => {
  const updates = req.body;

  if (ObjectId.isValid(req.params.id)) {
    db.collection("Books")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json({ message: "Book updated" });
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not update the book" });
      });
  } else {
    res.status(500).json({ error: "Invalid ID format" });
  }
});
