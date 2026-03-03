require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });
const { sql } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
    try {
        console.log('🔄 Setting up database...');
        
        // Read the schema file
        const schemaPath = path.join(__dirname, '..', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        // Execute the entire schema as one query
        console.log('Executing schema...');
        await sql.query(schema);
        
        console.log('✅ Database setup complete!');
        console.log('📊 Tables created: products, orders');
        console.log('📦 Sample data inserted');
        
        // Verify the setup
        const result = await sql`SELECT COUNT(*) as count FROM products`;
        console.log(`✅ Verified: ${result.rows[0].count} products in database`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error setting up database:', error);
        process.exit(1);
    }
}

setupDatabase();
