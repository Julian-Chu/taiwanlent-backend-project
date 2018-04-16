-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;

DROP TABLE `user`;
DROP TABLE `user_personal`;
DROP TABLE `user_business`;
DROP TABLE `gender`;
DROP TABLE `subject`;
DROP TABLE `region`;
DROP SCHEMA `taiwanlent`;
CREATE SCHEMA `taiwanlent`;

-- ************************************** `gender`
CREATE TABLE `gender`
(
 `gender_id` INT NOT NULL ,
 `gender`    VARCHAR(10) NOT NULL ,

PRIMARY KEY (`gender_id`),
CONSTRAINT `UC_gender` UNIQUE (`gender`),
);
-- ************************************** `subject`
CREATE TABLE `subject`
(
 `subject_id`    INT NOT NULL ,
 `subject_value` VARCHAR(10) NOT NULL ,
 `subject_label` VARCHAR(45) NOT NULL ,

PRIMARY KEY (`subject_id`),
CONSTRAINT `UC_subject` UNIQUE (`subject_value`, `subject_label`)
);
-- ************************************** `region`
CREATE TABLE `region`
(
 `region_id`    INT NOT NULL ,
 `region_value` VARCHAR(10) NOT NULL ,
 `region_label` VARCHAR(45) NOT NULL ,

PRIMARY KEY (`region_id`),
CONSTRAINT `UC_region` UNIQUE (`region_value`, `subject_label`)
);
-- ************************************** `user_personal`
CREATE TABLE `user_personal`
(
 `user_personal_id`      INT NOT NULL ,
 `username`              VARCHAR(50) NOT NULL ,
 `password`              VARCHAR(50) NOT NULL ,
 `email`                 VARCHAR(45) NOT NULL ,
 `name`                  VARCHAR(45) NOT NULL ,
 `phone`                 VARCHAR(45) NOT NULL ,
 `city`                  VARCHAR(45) NOT NULL ,
 `occupation`            VARCHAR(45) NOT NULL ,
 `living_year_ingermany` INT NOT NULL ,
 `school`                VARCHAR(45) NOT NULL ,
 `work_experience_1`     VARCHAR(45) ,
 `work_experience_2`     VARCHAR(45) ,
 `work_experience_3`     VARCHAR(45) ,
 `german`                BIT NOT NULL ,
 `english`               BIT NOT NULL ,
 `chinese`               BIT NOT NULL ,
 `driving_licence`       BIT NOT NULL ,
 `relocation`            BIT NOT NULL ,
 `self_introduction`     VARCHAR(250) NOT NULL ,
 `german_certificate`    VARCHAR(45) ,
 `english_certificate`   VARCHAR(45) ,
 `chinese_certificate`   VARCHAR(45) ,
 `gender_id`             INT NOT NULL ,
 `region_id`             INT NOT NULL ,
 `subject_id`            INT NOT NULL ,
 `photolink`             VARCHAR(45) ,
 `create_at`             DATE NOT NULL ,
 `change_at`             DATE NOT NULL ,
PRIMARY KEY (`user_personal_id`),
KEY `fkIdx_196` (`gender_id`),
CONSTRAINT `FK_196` FOREIGN KEY `fkIdx_196` (`gender_id`) REFERENCES `gender` (`gender_id`),
KEY `fkIdx_201` (`region_id`),
CONSTRAINT `FK_201` FOREIGN KEY `fkIdx_201` (`region_id`) REFERENCES `region` (`region_id`),
KEY `fkIdx_205` (`subject_id`),
CONSTRAINT `FK_205` FOREIGN KEY `fkIdx_205` (`subject_id`) REFERENCES `subject` (`subject_id`),
CONSTRAINT `UC_user_personal` UNIQUE (`username`, `email`)
);
-- ************************************** `user_business`
CREATE TABLE `user_business`
(
 `user_business_id`     INT NOT NULL ,
 `username`             VARCHAR(50) NOT NULL ,
 `password`             VARCHAR(50) NOT NULL ,
 `email`                VARCHAR(320) NOT NULL ,
 `name`                 VARCHAR(50) NOT NULL ,
 `phone`                VARCHAR(50) NOT NULL ,
 `company_name`         VARCHAR(50) ,
 `department`           VARCHAR(50) ,
 `company_location`     VARCHAR(50) NOT NULL ,
 `address`              VARCHAR(50) ,
 `industry`             VARCHAR(50) NOT NULL ,
 `product_introduction` VARCHAR(250) NOT NULL ,
 `gender_id`            INT NOT NULL ,
 `create_at`             DATE NOT NULL ,
 `change_at`             DATE NOT NULL ,

PRIMARY KEY (`user_business_id`),
KEY `fkIdx_192` (`gender_id`),
CONSTRAINT `FK_192` FOREIGN KEY `fkIdx_192` (`gender_id`) REFERENCES `gender` (`gender_id`),
CONSTRAINT `UC_user_business` UNIQUE (`username`, `email`)
);
-- ************************************** `user`
CREATE TABLE `user`
(
 `user_id`          INT NOT NULL ,
 `google_id`        INT ,
 `fackbook_id`      INT ,
 `user_business_id` INT NOT NULL ,
 `user_personal_id` INT NOT NULL ,

PRIMARY KEY (`user_id`),
KEY `fkIdx_135` (`user_business_id`),
CONSTRAINT `FK_135` FOREIGN KEY `fkIdx_135` (`user_business_id`) REFERENCES `user_business` (`user_business_id`),
KEY `fkIdx_171` (`user_personal_id`),
CONSTRAINT `FK_171` FOREIGN KEY `fkIdx_171` (`user_personal_id`) REFERENCES `user_personal` (`user_personal_id`),
CONSTRAINT `UC_user` UNIQUE (`google_id`, `fackbook_id`, `user_business_id`, `user_personal_id`)
);