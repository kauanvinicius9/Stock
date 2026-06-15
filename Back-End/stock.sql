CREATE DATABASE stock;

USE stock;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(255)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    stock_today INT,
    stock_min INT,
    load DECIMAL(10,2),
);

CREATE TABLE movimentations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    user_id INT,
    type ENUM('INPUT', 'OUTPUT'),
    quantity INT,
    movimentation_data DATETIME,

    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);