CREATE DATABASE IF NOT EXISTS appdb;

USE appdb;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email) VALUES ('dongvhv', 'dongvhv@example.com');
INSERT INTO users (name, email) VALUES ('nhanhb', 'nhanhb@example.com');