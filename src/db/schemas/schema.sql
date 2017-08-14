DROP TABLE IF EXISTS albums;
CREATE TABLE albums (
  id SERIAL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  password VARCHAR(255),
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);