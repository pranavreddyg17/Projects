--  Business Goal 1 : Should help identify underperforming phones based on the purchases made 
--  during specific times. It is achieved using the Customer purchase data and product data.

-- Query 1: Identify phones that underperformed based on the total quantity of purchases made
-- during January 1, 2023, and May 1, 2023.

-- Tables Used:
-- F23_S002_T4_customerbuysproducts (Aliased as cbp)
-- F23_S002_T4_products_model (Aliased as pm)
-- F23_S002_T4_products_brand (Aliased as pb)

WITH ProductQuantities AS (
    SELECT cbp.Productid, NVL(SUM(qty), 0) AS total_quantity
    FROM F23_S002_T4_customerbuysproducts cbp
    WHERE cbp.c_date BETWEEN '20230101' AND '20230501'
    GROUP BY ROLLUP(cbp.Productid)
)
SELECT pq.Productid, pm.model, pb.brand
FROM ProductQuantities pq
LEFT JOIN F23_S002_T4_products_model pm ON pq.Productid = pm.product_id
LEFT JOIN F23_S002_T4_products_brand pb ON pq.Productid = pb.product_id
WHERE pq.total_quantity = (SELECT MIN(total_quantity) FROM ProductQuantities);

-- Expected Output: 
-- PRODUCTID  MODEL BRAND
--------------------------------------------------------------------------------
-- 100041   iPhone 18 Apple
-- ... So on.


-- Businsess Goal 2 : Analyse the monthly purchase trends to understand customer behaviour. 
-- The purchase and customer data can be used to achieve this.

-- Query 2: Write a query to retrieve the total number of purchases made per month, 
-- broken down by year, to identify patterns in customer purchasing behavior.

-- Tables Used:
-- F23_S002_T4_purchase (Aliased as p)
-- F23_S002_T4_customer (Aliased as c)

SELECT
    EXTRACT(YEAR FROM TO_DATE(p.p_date, 'YYYYMMDD')) AS purchase_year,
    EXTRACT(MONTH FROM TO_DATE(p.p_date, 'YYYYMMDD')) AS purchase_month,
    COUNT(*) AS total_purchases
FROM
    F23_S002_T4_purchase p
    JOIN F23_S002_T4_customer c ON p.cust_id = c.customerid
GROUP BY
    EXTRACT(YEAR FROM TO_DATE(p.p_date, 'YYYYMMDD')),
    EXTRACT(MONTH FROM TO_DATE(p.p_date, 'YYYYMMDD'))
ORDER BY
    purchase_year, purchase_month;

-- Expected Output:
-- PURCHASE_YEAR PURCHASE_MONTH TOTAL_PURCHASES
------------- -------------- ---------------
--	 2023		   1		  17
--	 2023		   2		  28
--	 2023		   3		   5

-- Business Goal 3 : Based on the historical data (yearly, monthly or quarterly),
-- I should be able to forecast demand and manage inventory by using the amount of sales done
-- in previous months and estimating the stock that I might require in future months. It should 
-- be achieved using products data and purchase data.

-- Query 3: Write a query to identify products that were completely sold out
-- (total quantity sold equals the initial quantity stocked) within the period
-- from January 1, 2023, to May 1, 2023. 

-- Tables Used:
-- F23_S002_T4_customerbuysproducts (Aliased as cp)
-- F23_S002_T4_products_model (Aliased as pm)
-- F23_S002_T4_products_brand (Aliased as pb)
-- F23_S002_T4_products (Aliased as p)

WITH ProductSales AS (
  SELECT
    cp.productid,
    pm.model,
    pb.brand,
    p.stocking_date,
    cp.qty,
    SUM(cp.qty) OVER (
      PARTITION BY cp.productid 
      ORDER BY TO_DATE(cp.c_date, 'YYYYMMDD') 
      RANGE BETWEEN INTERVAL '30' DAY PRECEDING AND INTERVAL '1' DAY FOLLOWING
    ) AS TotalQuantitySold
  FROM
    F23_S002_T4_customerbuysproducts cp
    JOIN F23_S002_T4_products_model pm ON cp.productid = pm.product_id
    JOIN F23_S002_T4_products_brand pb ON cp.productid = pb.product_id
    JOIN F23_S002_T4_products p ON cp.productid = p.product_id
  WHERE
    cp.c_date BETWEEN '20230101' AND '20230501'
)
SELECT
  productid,
  model,
  brand,
  stocking_date,
  qty,
  TotalQuantitySold
FROM
  ProductSales
WHERE
  TotalQuantitySold IS NOT NULL
  AND TotalQuantitySold = qty
ORDER BY
  productid, stocking_date;

-- Expected Output:
-- PRODUCTID MODEL BRAND STOCKING QTY TOTALQUANTITYSOLD
-----------------------------------------------------
-- 100001 iPhone 14 Apple 20230101	  2		    2
-- ... so on

-- Business Goal 4 : Identify customers that buy all models of the same mobile phone brand. 
-- This should be achieved using customer, purchase and product data.

-- Tables Used:
-- F23_S002_T4_customer (Aliased as c)
-- F23_S002_T4_person (Aliased as p)
-- F23_S002_T4_products_brand (Aliased as pb)
-- F23_S002_T4_products (Aliased as p)
-- F23_S002_T4_customerbuysproducts (Alias as cbp)

SELECT DISTINCT c.customerid, p.fn, p.ln
FROM F23_S002_T4_customer c
JOIN F23_S002_T4_person p ON c.customerid = p.id
WHERE NOT EXISTS (
    (SELECT pb.product_id
     FROM F23_S002_T4_products_brand pb
     JOIN F23_S002_T4_products p ON pb.product_id = p.product_id
     WHERE pb.brand LIKE '%Apple%') 
    MINUS 
    (SELECT cbp.productid
     FROM F23_S002_T4_customerbuysproducts cbp
     WHERE cbp.custid = c.customerid)
);

-- Expected Output:
-- CUSTOMERID FN LN
--------------------------------------------------------------------------------
-- 111 Archer Stein

-- Business Goal 5: Maintain customer records , to track purchases and preferences. 
-- So, we can promote new products from their preferred brands in future dates.
-- It should be achieved using customer id, email, phone of the customer data and 
-- product id from the purchase data

-- Query 5: Retrieve the top 10 customers' details along with their preferred brands based on
-- purchase quantities. Track their emails, phone numbers, and the brands they buy the most.

-- Tables Used: 
-- F23_S002_T4_customerbuysproducts (aliased as C)
-- F23_S002_T4_person_email (aliased as P)
-- F23_S002_T4_person_phone (aliased as PP)
-- F23_S002_T4_products_brand (aliased as B)

SELECT
    C.custid,
    P.email,
    PP.phone,
    B.brand
FROM
    F23_S002_T4_customerbuysproducts C
JOIN
    F23_S002_T4_person_email P ON C.custid = P.id
JOIN
    F23_S002_T4_person_phone PP ON C.custid = PP.id
JOIN
    F23_S002_T4_products_brand B ON C.productid = B.product_id
GROUP BY
    C.custid, P.email, PP.phone, B.brand
ORDER BY
    SUM(C.qty) DESC
FETCH FIRST 10 ROWS ONLY;

-- Expected Output:
-- CUSTID EMAIL PHONE BRAND
--------------------------------------------------------------------------------
-- 111 archer.stein@gmail.com 123-234-5678 Apple
-- .. so on

-- Business Goal 6: Sales Performance Incentives. Maintain records of staff and the total amount
-- of sales they generate in a year. Calculate the sales performance for each staff member based 
-- on the total sales amount associated with their transactions using the staff id, product data
-- and purchase data.

-- Query 6: Calculate the total sales and incentive for each staff member. 
-- The incentive is calculated as 2% of the total selling price of products purchased by 
-- customers associated with each staff member. Consider transactions that occurred between 
-- January 1, 2023, and January 1, 2024.

-- Tables Used:
-- F23_S002_T4_customerbuysproducts (Aliased as C)
-- F23_S002_T4_purchase (Aliased as P)
-- F23_S002_T4_products (Aliased as PR)

SELECT
    P.staff_id,
    SUM(PR.selling_price) AS sellingPriceTotal,
    SUM(PR.selling_price) * 0.02 AS Incentive
FROM
    F23_S002_T4_customerbuysproducts C
JOIN
    F23_S002_T4_purchase P ON C.custid = P.cust_id
JOIN
    F23_S002_T4_products PR ON C.productid = PR.product_id
WHERE
    C.c_date BETWEEN '20230101' AND '20240101'
GROUP BY
    P.staff_id
ORDER BY
    P.staff_id ASC;

--Expected Output:
-- STAFF_ID SELLINGPRICETOTAL  INCENTIVE
---------- ----------------- ----------
--	 1		5100	    102
--	 2		5370	  107.4
--	 3		5220	  104.4
--	 4		5650	    113
--	 5		5520	  110.4
--	 6		5930	  118.6
--	 7		5100	    102
--	 8		5370	  107.4
--	 9		5220	  104.4
--	10		5650	    113


--  Business Goal 7:  Evaluate staff performance. It should be achieved by 
-- using customer rating as a satisfactory attribute.

-- Query 7: Retrieve information of staff whose average customer rating is below 3.5

-- Tables Used:
-- F23_S002_T4_person  (Aliased as PS)
-- F23_S002_T4_purchase (Aliased as P)

SELECT PS.id, PS.fn, PS.ln
FROM F23_S002_T4_person PS
JOIN F23_S002_T4_purchase P ON P.staff_id = PS.id
GROUP BY PS.id, PS.fn, PS.ln
HAVING AVG(P.rating) < 3.5;

-- Expected Output:
--	ID FN LN
--------------------------------------------------------------------------------
-- 6 Olivia Miller
-- 27 Matthew Cooper
-- .. so on


-- Business Goal 8 : Evaluate the max used method of payment (specific for any bank) 
-- for purchase so that the offer can be clubbed for more discount and increase of sales. 
-- It should be achieved using method of payment of the purchase data.

-- Query 8 : Write a query to analyze the distribution of payment methods used by
-- customers for purchases.

-- Tables Used:
-- F23_S002_T4_purchase

SELECT method_of_payment, COUNT(purchase_id)
FROM F23_S002_T4_purchase
GROUP BY method_of_payment
HAVING COUNT(purchase_id) = (
    SELECT MAX(cnt)
    FROM (
        (SELECT COUNT(purchase_id) AS cnt
        FROM F23_S002_T4_purchase
        GROUP BY ROLLUP(method_of_payment))
        MINUS
        (SELECT MAX(cnt)
        FROM (
            SELECT COUNT(purchase_id) AS cnt
            FROM F23_S002_T4_purchase
            GROUP BY ROLLUP(method_of_payment)
        ) subquery)
    ) subquery_outer
);

-- Expected Output:
-- METHOD_OF_PAYMENT COUNT(PURCHASE_ID)
-----------------------------------------
-- Chase
    --13
--Discover
	--13
