// Vercel Serverless Function for Single Post API
const { MongoClient, ObjectId } = require('mongodb');

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return { db, client };
  }

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  
  await client.connect();
  const db = client.db('project-zenith');

  cachedClient = client;
  cachedDb = db;

  return { db, client };
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  try {
    const { db } = await connectToDatabase();
    const postsCollection = db.collection('posts');

    // GET single post
    if (req.method === 'GET') {
      const post = await postsCollection.findOne({ _id: new ObjectId(id) });
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      return res.status(200).json(post);
    }

    // PUT update post
    if (req.method === 'PUT') {
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
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: 'after' }
      );

      if (!result.value) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.status(200).json(result.value);
    }

    // DELETE post
    if (req.method === 'DELETE') {
      const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      return res.status(200).json({ message: 'Post deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
