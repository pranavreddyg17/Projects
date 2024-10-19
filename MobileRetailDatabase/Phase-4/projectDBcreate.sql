-- Creating the 'person' table
CREATE TABLE F23_S002_T4_person (
    id INT PRIMARY KEY,
    dob CHAR(8),
    fn VARCHAR(255),
    mn VARCHAR(255),
    ln VARCHAR(255)
);

-- Creating the 'person_email' table
CREATE TABLE F23_S002_T4_person_email (
    id INT,
    email VARCHAR(255),
    PRIMARY KEY (id, email),
    FOREIGN KEY (id) REFERENCES F23_S002_T4_person(id) on delete cascade
);

-- Creating the 'person_phone' table
CREATE TABLE F23_S002_T4_person_phone (
    id INT,
    phone VARCHAR(20),
    PRIMARY KEY (id, phone),
    FOREIGN KEY (id) REFERENCES F23_S002_T4_person(id) on delete cascade
);

-- Creating the 'staff' table
CREATE TABLE F23_S002_T4_staff (
    staffid INT PRIMARY KEY,
    salary INT,
    position VARCHAR2(255) CHECK (position IN ('marketing', 'sales')),
    password_hash VARCHAR2(255), 
    FOREIGN KEY (staffid) REFERENCES F23_S002_T4_person(id) on delete cascade
);

-- Creating the 'customer' table
CREATE TABLE F23_S002_T4_customer (
    customerid INT PRIMARY KEY,
    FOREIGN KEY (customerid) REFERENCES F23_S002_T4_person(id) on delete cascade
);

-- Creating the 'promotion' table
CREATE TABLE F23_S002_T4_promotion (
    promotionid INT PRIMARY KEY,
    discount DECIMAL(5,2)
);

-- Creating the 'products' table
CREATE TABLE F23_S002_T4_products (
    product_id INT PRIMARY KEY,
    base_price FLOAT,
    selling_price FLOAT,
    stocking_date CHAR(8),
    no_of_pieces INT
);

-- Creating the 'products_brand' table
CREATE TABLE F23_S002_T4_products_brand (
    product_id INT,
    brand VARCHAR(255),
    PRIMARY KEY (product_id, brand),
    FOREIGN KEY (product_id) REFERENCES F23_S002_T4_products(product_id) on delete cascade
);

-- Creating the 'products_model' table
CREATE TABLE F23_S002_T4_products_model (
    product_id INT,
    model VARCHAR(255),
    PRIMARY KEY (product_id, model),
    FOREIGN KEY (product_id) REFERENCES F23_S002_T4_products(product_id) on delete cascade
);

-- Creating the 'purchase' table
CREATE TABLE F23_S002_T4_purchase (
    purchase_id INT PRIMARY KEY,
    method_of_payment VARCHAR(255),
    cust_id INT,
    staff_id INT,
    p_date CHAR(8),
    rating INT CHECK (rating BETWEEN 0 AND 5),
    FOREIGN KEY (cust_id) REFERENCES F23_S002_T4_customer(customerid) on delete cascade,
    FOREIGN KEY (staff_id) REFERENCES F23_S002_T4_staff(staffid) on delete cascade
);

-- Creating the 'staffdoespromotion' table
CREATE TABLE F23_S002_T4_staffdoespromotion (
    staffid INT PRIMARY KEY,
    promotionid INT,
    start_date CHAR(8),
    end_date CHAR(8),
    FOREIGN KEY (staffid) REFERENCES F23_S002_T4_staff(staffid) on delete cascade,
    FOREIGN KEY (promotionid) REFERENCES F23_S002_T4_promotion(promotionid) on delete cascade,
    CONSTRAINT fk_staffdoespromotion_staff_promotion UNIQUE (staffid, promotionid) 
);

-- Creating the 'staffsellsproducts' table
CREATE TABLE F23_S002_T4_staffsellsproducts (
    staffid INT,
    productid INT,
    PRIMARY KEY (staffid, productid),
    FOREIGN KEY (staffid) REFERENCES F23_S002_T4_staff(staffid) on delete cascade,
    FOREIGN KEY (productid) REFERENCES F23_S002_T4_products(product_id) on delete cascade
);

-- Creating the 'customerbenefitsfrompromotion' table
CREATE TABLE F23_S002_T4_customerbenefitsfrompromotion (
    custid INT,
    promotionid INT,
    PRIMARY KEY (custid, promotionid),
    FOREIGN KEY (custid) REFERENCES F23_S002_T4_customer(customerid) on delete cascade,
    FOREIGN KEY (promotionid) REFERENCES F23_S002_T4_promotion(promotionid) on delete cascade
);

-- Creating the 'customerbuysproducts' table
CREATE TABLE F23_S002_T4_customerbuysproducts (
    custid INT,
    productid INT,
    c_date CHAR(8),
    qty INT,
    PRIMARY KEY (custid, productid),
    FOREIGN KEY (custid) REFERENCES F23_S002_T4_customer(customerid) on delete cascade,
    FOREIGN KEY (productid) REFERENCES F23_S002_T4_products(product_id) on delete cascade
);

-- Creating the 'promotiononproducts' table
CREATE TABLE F23_S002_T4_promotiononproducts (
    promotionid INT,
    productid INT,
    PRIMARY KEY (promotionid, productid),
    FOREIGN KEY (promotionid) REFERENCES F23_S002_T4_promotion(promotionid) on delete cascade,
    FOREIGN KEY (productid) REFERENCES F23_S002_T4_products(product_id) on delete cascade
);
