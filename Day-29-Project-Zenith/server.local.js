// server.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
let db;
let postsCollection;

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db('project-zenith');
    postsCollection = db.collection('posts');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// API Routes

// Create a new post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, author, tags, published } = req.body;
    
    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, and author are required' });
    }

    const post = {
      title,
      content,
      author,
      tags: tags || [],
      published: published || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await postsCollection.insertOne(post);
    res.status(201).json({ ...post, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const { published } = req.query;
    const filter = published === 'true' ? { published: true } : {};
    
    const posts = await postsCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post by ID
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await postsCollection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Update post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { title, content, author, tags, published } = req.body;
    
    const updateData = {
      ...(title && { title }),
      ...(content && { content }),
      ...(author && { author }),
      ...(tags && { tags }),
      ...(published !== undefined && { published }),
      updatedAt: new Date()
    };

    const result = await postsCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.value);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const result = await postsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
