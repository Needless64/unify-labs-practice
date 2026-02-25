// Vercel Serverless Function for Single Post API
const { neon } = require('@neondatabase/serverless');

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
    const sql = neon(process.env.DATABASE_URL);

    // GET single post
    if (req.method === 'GET') {
      const posts = await sql`
        SELECT * FROM posts WHERE id = ${id}
      `;
      
      if (posts.length === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      return res.status(200).json(posts[0]);
    }

    // PUT update post
    if (req.method === 'PUT') {
      const { title, content, author, tags, published } = req.body;
      
      const posts = await sql`
        UPDATE posts 
        SET 
          title = COALESCE(${title}, title),
          content = COALESCE(${content}, content),
          author = COALESCE(${author}, author),
          tags = COALESCE(${tags || null}::text[], tags),
          published = COALESCE(${published !== undefined ? published : null}, published),
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      if (posts.length === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.status(200).json(posts[0]);
    }

    // DELETE post
    if (req.method === 'DELETE') {
      const result = await sql`
        DELETE FROM posts WHERE id = ${id}
        RETURNING id
      `;
      
      if (result.length === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      return res.status(200).json({ message: 'Post deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
