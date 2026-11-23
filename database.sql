CREATE DATABASE IF NOT EXISTS bongx031_business;

USE bongx031_business;

CREATE TABLE IF NOT EXISTS businesses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    business_name VARCHAR(150) NOT NULL,
    owner_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    whatsapp VARCHAR(30) NOT NULL,
    category VARCHAR(100) NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    price VARCHAR(50) NOT NULL,
    location VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
