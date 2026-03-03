-- Titan E-Commerce Store Database Schema for PostgreSQL

-- Drop tables if they exist
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    category VARCHAR(100),
    rating DECIMAL(2, 1) DEFAULT 4.5,
    reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    shipping_address JSONB,
    items JSONB NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products (INR prices)
INSERT INTO products (name, price, description, image, category, rating, reviews) VALUES
('Titan Audio Ultra Pro Wireless Noise Cancelling Headphones', 16599.00, 'Premium wireless headphones with active noise cancellation, 40-hour battery life, and superior sound quality.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwRlUxQXN-r6mNkl5xsKLC9OYANw0Q3_mqnEzLm3xzr37d9mGY0jFBkGfXhGlFrr7hsvpdCeuTHinKHU5iXoVjiNN1oRWNQjztnPMnR566M2wceLvuW02tYDhGXJhBBCXGvHkveql3Tlqmd9mOcNGOtAnCv-KeLmaQHtp82Eb02j1sLIRgcpbdK9fYBh9bBpGglFRAKOD49q2BsCqUEg3L590epc5Z568fUsufsOBli2uOFpRbGmzmTDFPZFumEsYdCkt074EKuaKo', 'Electronics', 4.5, 12430),

('Classic Minimalist Silver Series Quartz Watch', 10375.00, 'Elegant minimalist watch with silver stainless steel case and genuine leather strap.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs-1Tmfzc2O37ozqzkq05yFg293Mbd0NrwyjFyIvB6jWiIxtqIJTkP2YIZb9uv7H55p8uwj_TvXvNlfDlloKwl6pwPBqQQR81dRomf0FIYuz9zQhhfKqECP6t-gvoxgDNxDOD8EphlncLbnoMOzvwDVzj-UlROFtbH0yf7iWctkHW_EiuG5AMSH-4wX_yvHEJf7tgao6hV45shzMTatYraUpopBAIspa3HqOH35DjgJwRe6jHhQelGpCK75bIIofeMX2nqh4Bjtmp1', 'Fashion', 5.0, 856),

('Titan Echo Dot - 5th Gen | Smart Speaker with Alexa', 4149.00, 'Compact smart speaker with improved audio and Alexa voice control.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxR0n9EqdPAxFWgpBj_UG1aPCTnrQGzy9UH3dPyc_m2kzW3M4ZsEqnAUwT4I9E38rnQYVafWOR0oW2XOP-rw9pMl7EeBViwgDPgU4UzQGbbqsJnyblWhSwOq9WYCINvXbfvz3GtGDTnYn5yFn_enZVSIREKt4_T9yHxUh_6H0gfKtd4orwch1107GD58tKTqKl1T2gBKb6WlLEhfRu5fh4OqCcdH4jNnWNfu4-z8DKyoeqBh8kHVAbyrQY0ff9ohLrZvM9jgkGmkEq', 'Electronics', 4.8, 42102),

('Water Resistant Laptop Backpack with USB Charging Port', 2901.00, 'Durable backpack with multiple compartments and built-in USB charging port.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBii1E7VaT5qeypVZaGxN3DlVCYq1f3wluEOvwVIZn6uxCaKuwmFhyMupiZxJNvqAD42KHof7hXnOCF9v_mxJvO1Qo8WVkZ8PWWOI0e-eRuJ5CG9eNhFLkMmuOEIqlHF0xHKtj_N83Y1RfR6UBij58dZ3hYBxU88uDmif61xmssSmZgh92TJJeqwD0UThr08HgMmkeN-TeXXu5KO3S2wbP6bkJfkO9UJ3siOBDoLD7jcf2P1waBjesvcOKZZvAsf6OQa028nD9avT9c', 'Fashion', 4.6, 5190),

('Vintage Series Instant Film Camera - Aqua Blue', 5644.00, 'Retro-style instant camera with automatic exposure and built-in flash.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdkTAhxakawCpDnnfjuvFFclYwmDlKKWjCZMPUU6mgEYLrwwRFHLmC8242MWXIq7xRmOw7nmsRHUvWcoGYVOIC-oWS26BOqT4vJHruErRWSDZHnrD1ePWp0kasRUzqYAXdCDZk7VpCALeKyBsENXIsO_DYaNkHRv1Ko_lejhqiXA5mQXBOkyr4LKOw4AaSeX8mxiEO9y1hZ7BQXndJMc9Q5nwA9b6YrFOH6R73_YVvUaIQBmPrkrF_OlEISUHtGl03t3JD7qrCWqjh', 'Electronics', 4.4, 2341),

('Titan Pad Pro 11-inch - 256GB WiFi Only', 66317.00, 'Powerful tablet with stunning display and all-day battery life.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKq1JQ8s2efFPrj7fikBYO79h7wO8SZ1pkVzQz0EfyQe7oPdHVTQFbRur8L_E9i33tZLLK-3AjHopS1gtvKDSSxRLQAq073BBm1Z6WZfHco5xNNV6CTLvrUN5ZQ86C_bIoSEnLqa1GpCDbP_3r35pT1afaleKLO65whw7-rs4YrWM2grkQUnoHtiAga5JT6U8PnDFyv3C88jSmxuaGlrNUZKrCgs0ltEAuqEeWuiqpDSdr6vpERO-0EH5GcgkwV88pQnD6ZGdBcPS2', 'Electronics', 4.7, 3921),

('55-inch Crystal 4K Smart TV with Built-in Apps', 37183.00, 'Ultra HD smart TV with vibrant colors and streaming apps built-in.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwyRfYYqZ8oJebrr6IZTQ_i2PShnX56fzvtoCz3cg5gOJH-SKRwK94XKQ11REIk40MHn-PSw8Pl1un2Zmm8guRW_8ouvPpZ7RWHSwRPscgL0ZxAp7CMbe5lfFk93QJeItIA4nzLqQwuWzHUGeJ3ylAX8I0iLwmgajUUrs3dk9fE0IJ6APbiVh2trdMpROb-unWACPtMto2HkgOT2-0CHBTHzojvPBbm_JAV8u8AX3ZdS2kvt-cJGVBgn0ZO7aC4lqUL6QI1RoyOsha', 'Electronics', 4.5, 1044),

('Titan Phone 15 Pro - Titanium Rose, 128GB', 82917.00, 'Latest flagship smartphone with advanced camera system and titanium design.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0n78LR10epjzlkTqW17_dyZZeBvek-4mFcr2n50rwaAn4ay2U6ll2BoU_oj0B917S6Tn1lNnS6Wf9mnSgCChXhrRKGxrubJLg2bdm_pY8Wg_iKUlWJnWk1ptYWVFeg80TgLZdwwCMmxL_RaRgxPaGIMJC0_nVRBmYRA0BbVciPWbJRiW74PRMY1lrfYBN6rYl587yNRoFS2GK_LCknRWEbUMXrjLqLWHw7m-ij3ALb7tXdKyVWbheHip75E5Ey3jlMksgBxnKzFAp', 'Electronics', 4.8, 502);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
