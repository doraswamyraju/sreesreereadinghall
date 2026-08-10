-- Sree Sree Reading Hall MySQL Database Schema
CREATE DATABASE IF NOT EXISTS sreesree_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sreesree_db;

-- 1. Admin & Student Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Reading Hall Seats Table
CREATE TABLE IF NOT EXISTS seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seat_number VARCHAR(20) UNIQUE NOT NULL,
    zone ENUM('ac_prime', 'ac_standard', 'non_ac', 'silent_cabin') NOT NULL,
    status ENUM('available', 'reserved', 'occupied', 'maintenance') DEFAULT 'available',
    row_letter CHAR(1) NOT NULL,
    col_number INT NOT NULL,
    price_per_month DECIMAL(10,2) NOT NULL,
    has_power_outlet BOOLEAN DEFAULT TRUE,
    has_desk_lamp BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_code VARCHAR(30) UNIQUE NOT NULL,
    seat_id INT NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    exam_prep VARCHAR(100),
    shift ENUM('morning', 'afternoon', 'evening', 'full_day', 'night_shift') DEFAULT 'full_day',
    duration_months INT DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('pending', 'paid', 'cancelled') DEFAULT 'pending',
    start_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE CASCADE
);

-- 4. Blog Posts Table
CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    author VARCHAR(100) DEFAULT 'Sree Sree Admin',
    read_time VARCHAR(20) DEFAULT '3 min read',
    image_url VARCHAR(255),
    tags VARCHAR(255),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Student Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    exam_target VARCHAR(100),
    preferred_shift VARCHAR(50),
    message TEXT,
    status ENUM('new', 'contacted', 'closed') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Seats Data (48 Desks)
INSERT IGNORE INTO seats (seat_number, zone, status, row_letter, col_number, price_per_month) VALUES
('S-01', 'ac_prime', 'available', 'A', 1, 1500.00),
('S-02', 'ac_prime', 'reserved', 'A', 2, 1500.00),
('S-03', 'ac_prime', 'occupied', 'A', 3, 1500.00),
('S-04', 'ac_prime', 'occupied', 'A', 4, 1500.00),
('S-05', 'ac_prime', 'available', 'A', 5, 1500.00),
('S-06', 'ac_prime', 'available', 'A', 6, 1500.00),
('S-07', 'ac_prime', 'occupied', 'A', 7, 1500.00),
('S-08', 'ac_prime', 'available', 'A', 8, 1500.00),
('S-09', 'ac_standard', 'available', 'B', 1, 1200.00),
('S-10', 'ac_standard', 'available', 'B', 2, 1200.00),
('S-11', 'non_ac', 'available', 'C', 1, 900.00),
('S-12', 'non_ac', 'available', 'C', 2, 900.00);
