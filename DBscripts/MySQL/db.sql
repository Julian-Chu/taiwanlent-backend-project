Executing (default): DROP TABLE IF EXISTS `user_general`;
Executing (default): DROP TABLE IF EXISTS `user_personal`;
Executing (default): DROP TABLE IF EXISTS `subject`;
Executing (default): DROP TABLE IF EXISTS `region`;
Executing (default): DROP TABLE IF EXISTS `user_business`;
Executing (default): DROP TABLE IF EXISTS `gender`;
Executing (default): DROP TABLE IF EXISTS `user_admin`;
Executing (default): DROP TABLE IF EXISTS `user_admin`;
Executing (default): CREATE TABLE IF NOT EXISTS `user_admin` (`user_admin_id` INTEGER NOT NULL auto_increment , `username` VARCHAR(25) NOT NULL, `password` VARCHAR(25) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`user_admin_id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `user_admin`
Executing (default): DROP TABLE IF EXISTS `gender`;
Executing (default): CREATE TABLE IF NOT EXISTS `gender` (`gender_id` INTEGER NOT NULL auto_increment , `gender` VARCHAR(10) NOT NULL UNIQUE, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`gender_id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `gender`
Executing (default): DROP TABLE IF EXISTS `user_business`;
Executing (default): CREATE TABLE IF NOT EXISTS `user_business` (`user_business_id` INTEGER NOT NULL auto_increment , `username` VARCHAR(50) NOT NULL UNIQUE, `password` VARCHAR(50) NOT NULL, `email` VARCHAR(320) NOT NULL , `name` VARCHAR(50) NOT NULL, `phone` VARCHAR(50) NOT NULL, `company_name` VARCHAR(50), `department` VARCHAR(50), `company_location` VARCHAR(50) NOT NULL, `address` VARCHAR(50), `industry` VARCHAR(50) NOT NULL, `product_introduction` VARCHAR(250) NOT NULL, `gender_id` INTEGER NOT NULL, `create_at` DATE NOT NULL, `change_at` DATE NOT NULL, `email_verified` TINYINT(1) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`user_business_id`, `email`), FOREIGN KEY (`gender_id`) REFERENCES `gender` (`gender_id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `user_business`
Executing (default): DROP TABLE IF EXISTS `region`;
Executing (default): CREATE TABLE IF NOT EXISTS `region` (`region_id` INTEGER NOT NULL auto_increment , `region_value` VARCHAR(10) NOT NULL UNIQUE, `region_label` VARCHAR(50) NOT NULL , `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`region_id`, `region_label`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `region`
Executing (default): DROP TABLE IF EXISTS `subject`;
Executing (default): CREATE TABLE IF NOT EXISTS `subject` (`subject_id` INTEGER NOT NULL auto_increment , `subject_value` VARCHAR(10) NOT NULL UNIQUE, `subject_label` VARCHAR(50) NOT NULL , `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`subject_id`, `subject_label`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `subject`
Executing (default): DROP TABLE IF EXISTS `user_personal`;
Executing (default): CREATE TABLE IF NOT EXISTS `user_personal` (`user_personal_id` INTEGER NOT NULL auto_increment , `username` VARCHAR(25) NOT NULL UNIQUE, `password` VARCHAR(25) NOT NULL, `email` VARCHAR(320) NOT NULL , `name` VARCHAR(50) NOT NULL, `phone` VARCHAR(50) NOT NULL, `city` VARCHAR(50) NOT NULL, `occupation` VARCHAR(50) NOT NULL, `living_year_in_germany` INTEGER NOT NULL, `school` VARCHAR(50) NOT NULL, `work_experience_1` VARCHAR(50), `work_experience_2` VARCHAR(50), `work_experience_3` VARCHAR(50), `german` TINYINT(1) NOT NULL, `english` TINYINT(1) NOT NULL, `chinese` TINYINT(1) NOT NULL, `driving_licence` TINYINT(1) NOT NULL, `relocation` TINYINT(1) NOT NULL, `self_introduction` VARCHAR(255), `german_certificate` VARCHAR(50), `english_certificate` VARCHAR(50), `chinese_certificate` VARCHAR(50), `gender_id` INTEGER NOT NULL, `region_id` INTEGER NOT NULL, `subject_id` INTEGER NOT NULL, `photolink` VARCHAR(2083), `create_at` DATE NOT NULL, `change_at` DATE NOT NULL, `resume_open` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`user_personal_id`, `email`), FOREIGN KEY (`gender_id`) REFERENCES `gender` (`gender_id`), FOREIGN KEY (`region_id`) REFERENCES `region` (`region_id`), FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `user_personal`
Executing (default): DROP TABLE IF EXISTS `user_general`;
Executing (default): CREATE TABLE IF NOT EXISTS `user_general` (`user_id` INTEGER NOT NULL auto_increment , `google_id` INTEGER UNIQUE, `facebook_id` INTEGER , `user_business_id` INTEGER NOT NULL, `user_personal_id` INTEGER NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`user_id`, `facebook_id`), FOREIGN KEY (`user_business_id`) REFERENCES `user_business` (`user_business_id`), FOREIGN KEY (`user_personal_id`) REFERENCES `user_personal` (`user_personal_id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `user_general`