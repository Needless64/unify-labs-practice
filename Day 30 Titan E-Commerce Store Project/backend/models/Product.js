const { sql } = require('../config/database');

class Product {
    static async findAll() {
        const result = await sql`SELECT * FROM products ORDER BY id`;
        return result.rows;
    }

    static async findById(id) {
        const result = await sql`SELECT * FROM products WHERE id = ${id}`;
        return result.rows[0];
    }

    static async create(productData) {
        const { name, price, description, image, category, rating = 4.5, reviews = 0 } = productData;
        const result = await sql`
            INSERT INTO products (name, price, description, image, category, rating, reviews) 
            VALUES (${name}, ${price}, ${description}, ${image}, ${category}, ${rating}, ${reviews}) 
            RETURNING *
        `;
        return result.rows[0];
    }

    static async update(id, productData) {
        const { name, price, description, image, category, rating, reviews } = productData;
        const result = await sql`
            UPDATE products 
            SET name = ${name}, price = ${price}, description = ${description}, 
                image = ${image}, category = ${category}, rating = ${rating}, reviews = ${reviews} 
            WHERE id = ${id} 
            RETURNING *
        `;
        return result.rows[0];
    }

    static async delete(id) {
        await sql`DELETE FROM products WHERE id = ${id}`;
        return { message: 'Product deleted successfully' };
    }
}

module.exports = Product;
