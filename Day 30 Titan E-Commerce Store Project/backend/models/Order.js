const { sql } = require('../config/database');

class Order {
    static async findAll() {
        const result = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
        return result.rows;
    }

    static async findById(id) {
        const result = await sql`SELECT * FROM orders WHERE id = ${id}`;
        return result.rows[0];
    }

    static async create(orderData) {
        const { 
            customer_name, 
            customer_email, 
            customer_phone, 
            shipping_address, 
            items, 
            total_amount, 
            status = 'pending' 
        } = orderData;
        
        const result = await sql`
            INSERT INTO orders (customer_name, customer_email, customer_phone, shipping_address, items, total_amount, status) 
            VALUES (${customer_name}, ${customer_email}, ${customer_phone}, ${JSON.stringify(shipping_address)}, ${JSON.stringify(items)}, ${total_amount}, ${status}) 
            RETURNING *
        `;
        return result.rows[0];
    }

    static async update(id, orderData) {
        const { status } = orderData;
        const result = await sql`
            UPDATE orders 
            SET status = ${status} 
            WHERE id = ${id} 
            RETURNING *
        `;
        return result.rows[0];
    }

    static async delete(id) {
        await sql`DELETE FROM orders WHERE id = ${id}`;
        return { message: 'Order deleted successfully' };
    }
}

module.exports = Order;
