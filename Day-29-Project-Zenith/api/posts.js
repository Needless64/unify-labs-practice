// Vercel Serverless Function using Neon Postgres
// Neon is Vercel's recommended serverless Postgres

import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        tags TEXT[] DEFAULT '{}',
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // GET all posts
    if (req.method === 'GET') {
      const { published } = req.query;
      
      let posts;
      if (published === 'true') {
        posts = await sql`SELECT * FROM posts WHERE published = true ORDER BY created_at DESC`;
      } else {
        posts = await sql`SELECT * FROM posts ORDER BY created_at DESC`;
      }
      
      return res.status(200).json(posts);
    }

    // POST create new post
    if (req.method === 'POST') {
      const { title, content, author, tags, published } = req.body;
      
      if (!title || !content || !author) {
        return res.status(400).json({ error: 'Title, content, and author are required' });
      }

      const result = await sql`
        INSERT INTO posts (title, content, author, tags, published)
        VALUES (${title}, ${content}, ${author}, ${tags || []}, ${published || false})
        RETURNING *
      `;

      return res.status(201).json(result[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
}
