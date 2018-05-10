INSERT INTO taiwanlent.user_business(
	username, password, email, name, phone, company_name, department, company_location, address, industry, product_introduction, gender_id, create_at, change_at, email_verified)
	VALUES ('test_businessUser', '1234', 'test@test.com', 'John', '12314124141', null,null , 'Berlin', null, 'Pet', 'Pet', 1, now(),now() , false);