const { sql } = require('@vercel/postgres');

// Test connection
async function testConnection() {
    try {
        const result = await sql`SELECT NOW()`;
        console.log('✅ Connected to Vercel Postgres (Neon)');
        return true;
    } catch (error) {
        console.error('❌ Database connection error:', error);
        return false;
    }
}

testConnection();

module.exports = { sql };
