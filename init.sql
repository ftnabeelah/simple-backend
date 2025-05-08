-- This SQL script creates a simple products table and inserts two records.
-- You can copy/paste this entire content into the "Database Initialization Script" box in SidePro
-- when creating the MySQL database, or upload it as a .sql file (max 10 MB).

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

INSERT INTO products (name, price) VALUES
  ('Apple', 0.99),
  ('Orange', 1.29); 