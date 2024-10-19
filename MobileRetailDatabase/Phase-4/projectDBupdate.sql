--DML commands for 'F23_S002_T4_person' table
-- Insert
INSERT INTO F23_S002_T4_person (id, dob, fn, mn, ln) VALUES (201, '19951231', 'Alice', 'M', 'Johnson');
INSERT INTO F23_S002_T4_person (id, dob, fn, mn, ln) VALUES (202, '19850717', 'Alan', 'C', 'John');
INSERT INTO F23_S002_T4_person (id, dob, fn, mn, ln) VALUES (203, '20010210', 'Alex', 'D', 'Jacob');
-- Delete
DELETE FROM F23_S002_T4_person WHERE id = 202;
-- Update
UPDATE F23_S002_T4_person SET ln = 'Reddy' WHERE id = 201;
-- Select
SELECT * FROM F23_S002_T4_person ORDER BY id DESC FETCH FIRST 5 ROWS ONLY;

--DML commands for 'F23_S002_T4_person_email' table
-- Insert
INSERT INTO F23_S002_T4_person_email (id, email) VALUES (201, 'alice@example.com');
INSERT INTO F23_S002_T4_person_email (id, email) VALUES (201, 'brian@example.com');
INSERT INTO F23_S002_T4_person_email (id, email) VALUES (203, 'alex@example.com');
-- Delete
DELETE FROM F23_S002_T4_person_email WHERE id = 201 AND email = 'brian@example.com';
-- Select
SELECT * FROM F23_S002_T4_person_email ORDER BY id DESC, email DESC FETCH FIRST 5 ROWS ONLY;

--DML commands for 'F23_S002_T4_person_phone' table
-- Insert
INSERT INTO F23_S002_T4_person_phone (id, phone) VALUES (201, '987-654-3210');
INSERT INTO F23_S002_T4_person_phone (id, phone) VALUES (201, '989-774-2310');
INSERT INTO F23_S002_T4_person_phone (id, phone) VALUES (203, '789-774-2310');
-- Delete
DELETE FROM F23_S002_T4_person_phone WHERE id = 201 AND phone = '989-774-2310';
-- Select
SELECT * FROM F23_S002_T4_person_phone ORDER BY id DESC, phone DESC FETCH FIRST 5 ROWS ONLY;

--DML commands for 'F23_S002_T4_staff' table
-- Insert
INSERT INTO F23_S002_T4_staff (staffid, salary, position, password_hash) VALUES (201, 75000, 'marketing', 'Password@Alice');
-- Delete
DELETE FROM F23_S002_T4_staff WHERE staffid = 100;
-- Update
UPDATE F23_S002_T4_staff SET salary = 80000 WHERE staffid = 201;
-- Select
SELECT * FROM F23_S002_T4_staff ORDER BY staffid DESC FETCH FIRST 5 ROWS ONLY;

--DML commands for 'F23_S002_T4_customer' table
-- Insert
INSERT INTO F23_S002_T4_customer (customerid) VALUES (203);
-- Delete
DELETE FROM F23_S002_T4_customer WHERE customerid = 101;
-- Select
SELECT * FROM F23_S002_T4_customer ORDER BY customerid DESC FETCH FIRST 5 ROWS ONLY;

--DML commands for 'F23_S002_T4_promotion' table
-- Insert
INSERT INTO F23_S002_T4_promotion (promotionid, discount) VALUES (1051, 10.00);
INSERT INTO F23_S002_T4_promotion (promotionid, discount) VALUES (1052, 11.00);
-- Delete
DELETE FROM F23_S002_T4_promotion WHERE promotionid = 1052;
-- Update
UPDATE F23_S002_T4_promotion SET discount = 15.00 WHERE promotionid = 1051;
-- Select
SELECT * FROM F23_S002_T4_promotion ORDER BY promotionid DESC FETCH FIRST 5 ROWS ONLY;

--DML commands for 'F23_S002_T4_products' table
-- Insert
INSERT INTO F23_S002_T4_products (product_id, base_price, selling_price, stocking_date, no_of_pieces) VALUES (100061, 800.00, 1000.00, '20230201', 30);
INSERT INTO F23_S002_T4_products (product_id, base_price, selling_price, stocking_date, no_of_pieces) VALUES (100071, 750.00, 1000.00, '20230201', 20);
-- Delete
DELETE FROM F23_S002_T4_products WHERE product_id = 100071;
-- Update
UPDATE F23_S002_T4_products SET selling_price = 1200.00 WHERE product_id = 100061;
-- Select
SELECT * FROM F23_S002_T4_products ORDER BY product_id DESC FETCH FIRST 5 ROWS ONLY;

--DML commands for 'F23_S002_T4_products_brand' table
-- Insert
INSERT INTO F23_S002_T4_products_brand (product_id, brand) VALUES (100061, 'NewBrand');
-- Delete
DELETE FROM F23_S002_T4_products_brand WHERE product_id = 100061 AND brand = 'NewBrand';
-- Insert
INSERT INTO F23_S002_T4_products_brand (product_id, brand) VALUES (100061, 'Apple');
-- Select
SELECT * FROM F23_S002_T4_products_brand ORDER BY product_id DESC, brand DESC FETCH FIRST 5 ROWS ONLY;

--DML commands for 'F23_S002_T4_products_model' table
-- Insert
INSERT INTO F23_S002_T4_products_model (product_id, model) VALUES (100061, '20');
-- Delete
DELETE FROM F23_S002_T4_products_model WHERE product_id = 100061 AND model = '20';
-- Insert
INSERT INTO F23_S002_T4_products_model (product_id, model) VALUES (100061, '21');
-- Select
SELECT * FROM F23_S002_T4_products_model;

--DML commands for 'F23_S002_T4_purchase' table
-- Insert
INSERT INTO F23_S002_T4_purchase (purchase_id, method_of_payment, cust_id, staff_id, p_date, rating) VALUES (10000051, 'Visa', 102, 1, '20230310', 4);
-- Delete
DELETE FROM F23_S002_T4_purchase WHERE purchase_id = 10000049;
-- Update
UPDATE F23_S002_T4_purchase SET rating = 3 WHERE purchase_id = 10000051;
-- Select
SELECT * FROM F23_S002_T4_purchase ORDER BY purchase_id DESC FETCH FIRST 5 ROWS ONLY;

--DML commands for 'F23_S002_T4_staffdoespromotion' table
-- Insert
INSERT INTO F23_S002_T4_staffdoespromotion (staffid, promotionid, start_date, end_date) VALUES (51, 1049, '20230301', '20230315');
-- Delete
DELETE FROM F23_S002_T4_staffdoespromotion WHERE staffid = 50 AND promotionid = 1050;
-- Update
UPDATE F23_S002_T4_staffdoespromotion SET end_date = '20230310' WHERE staffid = 51 AND promotionid = 1049;
-- Select
SELECT * FROM F23_S002_T4_staffdoespromotion ORDER BY staffid DESC FETCH FIRST 5 ROWS ONLY;

--DML commands for 'F23_S002_T4_staffsellsproducts' table
-- Insert
INSERT INTO F23_S002_T4_staffsellsproducts (staffid, productid) VALUES (51, 100002);
-- Delete
DELETE FROM F23_S002_T4_staffsellsproducts WHERE staffid = 50 AND productid = 100054;
-- Select
SELECT * FROM F23_S002_T4_staffsellsproducts ORDER BY staffid DESC, productid DESC FETCH FIRST 5 ROWS ONLY;

--DML commands for 'F23_S002_T4_customerbenefitsfrompromotion' table
-- Insert
INSERT INTO F23_S002_T4_customerbenefitsfrompromotion (custid, promotionid) VALUES (203, 1049);
-- Delete
DELETE FROM F23_S002_T4_customerbenefitsfrompromotion WHERE custid = 102 AND promotionid = 1001;
-- Select
SELECT * FROM F23_S002_T4_customerbenefitsfrompromotion ORDER BY custid DESC, promotionid DESC FETCH FIRST 5 ROWS ONLY;

--DML commands for 'F23_S002_T4_customerbuysproducts' table
-- Insert
INSERT INTO F23_S002_T4_customerbuysproducts (custid, productid, c_date, qty) VALUES (102, 100002, '20230305', 5);
-- Delete
DELETE FROM F23_S002_T4_customerbuysproducts WHERE custid = 107 AND productid = 100005;
-- Update
UPDATE F23_S002_T4_customerbuysproducts SET qty = 8 WHERE custid = 102 AND productid = 100002;
-- Select
SELECT * FROM F23_S002_T4_customerbuysproducts ORDER BY custid DESC, productid DESC FETCH FIRST 5 ROWS ONLY;

--DML commands for 'F23_S002_T4_promotiononproducts' table
-- Insert
INSERT INTO F23_S002_T4_promotiononproducts (promotionid, productid) VALUES (1051, 100001);
-- Delete
DELETE FROM F23_S002_T4_promotiononproducts WHERE promotionid = 1050 AND productid = 100033;
-- Select
SELECT * FROM F23_S002_T4_promotiononproducts ORDER BY promotionid DESC, productid DESC FETCH FIRST 5 ROWS ONLY;