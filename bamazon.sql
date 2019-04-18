CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  -- Makes a string column called "food" which cannot contain null --
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- Makes an string column called "email" --
  product_name VARCHAR(40) NOT NULL,
  department_name VARCHAR(30) not null,
  -- phone_number is stored as VARCHAR because there are often non-numeric characters provided --
  price DECIMAL(10,2)not null,
  Stock_quantity integer not null,
  primary key (item_id)
);

select * from Products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Asus Laptop", "Laptop", 800, 54);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mac Book", "Laptop", 1000, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vizio", "TV", 500, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Halo 5", "Vido Game", 60, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Avengers Infinity War", "Movie", 4, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apples", "Food", 0.75, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bananas", "Food", 0.50, 498);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ibuprophen", "Pharmacy", 4.95, 389);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Band Aid", "Pharmacy", 3.25, 550);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scooter", "Vehicles", 70.00, 129);

