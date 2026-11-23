-- =========================================================
-- BONGX031 BUSINESS ADVERTISING MARKETPLACE
-- DATABASE
-- =========================================================

CREATE DATABASE IF NOT EXISTS bongx031_business;

USE bongx031_business;


-- =========================================================
-- BUSINESSES TABLE
-- =========================================================

CREATE TABLE IF NOT EXISTS businesses (

    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

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

    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP

);


-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_business_name
ON businesses (business_name);

CREATE INDEX idx_category
ON businesses (category);

CREATE INDEX idx_product_name
ON businesses (product_name);

CREATE INDEX idx_location
ON businesses (location);

CREATE INDEX idx_status
ON businesses (status);

CREATE INDEX idx_created_at
ON businesses (created_at);


-- =========================================================
-- TEST
-- =========================================================

SELECT * FROM businesses;
