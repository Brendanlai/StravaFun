-- Create a database
-- CREATE DATABASE stravaProject;


-- Show all entries in a table
-- SELECT * from TABLE 

-- List all tables \d

-- port

CREATE TABLE users(
    id BIGSERIAL NOT NULL,
    name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    location varchar(50)
);


INSERT INTO users (name, email, location) values ('Brendan Lai', 'laibrendan8@gmail.com', 'Toronto, Canada');

UPDATE users SET name = 'Nicky Lai', email = 'nicky.lai@rogers.com', location = 'Thornhill, Canada' WHERE id = 3;

DELETE from users where id = 1;
