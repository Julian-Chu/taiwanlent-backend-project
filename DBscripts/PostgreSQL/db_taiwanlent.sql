-- ****************** PostgreSQL ******************;
-- ***************************************************;

DROP TABLE IF EXISTS user_general;
DROP TABLE IF EXISTS user_personal;
DROP TABLE IF EXISTS user_business;
DROP TABLE IF EXISTS user_admin;
DROP TABLE IF EXISTS gender;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS region;
DROP SCHEMA IF EXISTS taiwanlent CASCADE;
CREATE SCHEMA taiwanlent;

SET search_path = taiwanlent;

-- ************************************** admin

CREATE TABLE taiwanlent.user_admin
(
 user_admin_id SERIAL ,
 username   VARCHAR(25) NOT NULL ,
 password   VARCHAR(25) NOT NULL ,

 PRIMARY KEY (user_admin_id)
);

-- ************************************** gender
CREATE TABLE taiwanlent.gender
(
 gender_id SERIAL ,
 gender    VARCHAR(10) NOT NULL ,

PRIMARY KEY (gender_id),
CONSTRAINT UC_gender UNIQUE (gender)
);

-- ************************************** subject
CREATE TABLE subject
(
 subject_id    SERIAL ,
 subject_value VARCHAR(10) NOT NULL ,
 subject_label VARCHAR(45) NOT NULL ,

PRIMARY KEY (subject_id),
CONSTRAINT UC_subject UNIQUE (subject_value, subject_label)
);
-- ************************************** region
CREATE TABLE region
(
 region_id    SERIAL ,
 region_value VARCHAR(10) NOT NULL ,
 region_label VARCHAR(45) NOT NULL ,

PRIMARY KEY (region_id),
CONSTRAINT UC_region UNIQUE (region_value, region_label)
);
-- ************************************** user_personal
CREATE TABLE user_personal
(
 user_personal_id      SERIAL ,
 username              VARCHAR(50) NOT NULL ,
 password              VARCHAR(50) NOT NULL ,
 email                 VARCHAR(45) NOT NULL ,
 name                  VARCHAR(45) NOT NULL ,
 phone                 VARCHAR(45) NOT NULL ,
 city                  VARCHAR(45) NOT NULL ,
 occupation            VARCHAR(45) NOT NULL ,
 living_year_ingermany INT NOT NULL ,
 school                VARCHAR(45) NOT NULL ,
 work_experience_1     VARCHAR(45) ,
 work_experience_2     VARCHAR(45) ,
 work_experience_3     VARCHAR(45) ,
 german                BIT NOT NULL ,
 english               BIT NOT NULL ,
 chinese               BIT NOT NULL ,
 driving_licence       BIT NOT NULL ,
 relocation            BIT NOT NULL ,
 self_introduction     VARCHAR(250) NOT NULL ,
 german_certificate    VARCHAR(45) ,
 english_certificate   VARCHAR(45) ,
 chinese_certificate   VARCHAR(45) ,
 gender_id             INT NOT NULL ,
 region_id             INT NOT NULL ,
 subject_id            INT NOT NULL ,
 photolink             VARCHAR(45) ,
 create_at             DATE NOT NULL ,
 change_at             DATE NOT NULL ,
PRIMARY KEY (user_personal_id),
FOREIGN KEY (gender_id) REFERENCES gender (gender_id),
FOREIGN KEY (region_id) REFERENCES region (region_id),
FOREIGN KEY (subject_id) REFERENCES subject (subject_id),
CONSTRAINT UC_user_personal UNIQUE (username, email)
);
-- ************************************** user_business
CREATE TABLE user_business
(
 user_business_id     SERIAL ,
 username             VARCHAR(50) NOT NULL ,
 password             VARCHAR(50) NOT NULL ,
 email                VARCHAR(320) NOT NULL ,
 name                 VARCHAR(50) NOT NULL ,
 phone                VARCHAR(50) NOT NULL ,
 company_name         VARCHAR(50) ,
 department           VARCHAR(50) ,
 company_location     VARCHAR(50) NOT NULL ,
 address              VARCHAR(50) ,
 industry             VARCHAR(50) NOT NULL ,
 product_introduction VARCHAR(250) NOT NULL ,
 gender_id            INT NOT NULL ,
 create_at             DATE NOT NULL ,
 change_at             DATE NOT NULL ,

PRIMARY KEY (user_business_id),
FOREIGN KEY (gender_id) REFERENCES gender (gender_id),
CONSTRAINT UC_user_business UNIQUE (username, email)
);
-- ************************************** user
CREATE TABLE user_general
(
 user_id          SERIAL ,
 google_id        INT ,
 fackbook_id      INT ,
 user_business_id INT NOT NULL ,
 user_personal_id INT NOT NULL ,

PRIMARY KEY (user_id),
FOREIGN KEY (user_business_id) REFERENCES user_business (user_business_id),
CONSTRAINT FK_171 FOREIGN KEY (user_personal_id) REFERENCES user_personal (user_personal_id),
CONSTRAINT UC_user UNIQUE (google_id, fackbook_id, user_business_id, user_personal_id)
);