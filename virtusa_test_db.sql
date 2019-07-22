-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for virtusa_test_db
CREATE DATABASE IF NOT EXISTS `virtusa_test_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `virtusa_test_db`;

-- Dumping structure for table virtusa_test_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Dumping data for table virtusa_test_db.users: ~6 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
	(1, 'Srinu', 'srinu@gmail.com', '$2b$10$BYEQjX38ntZD4Vv8Qk/TBuHagYIH34EERJTQ.K0Yo6QlIgomRDM0y'),
	(2, 'Srinu', 'srinu1@gmail.com', '$2b$10$GyGXQRETWBoCeWkO0hGY3.3eWBVEHjd8CLfQD5h6TXTqmj4t2WBV6'),
	(3, 'Srinu2', 'srinu2@gmail.com', '$2b$10$xaB5KVxBufyOBnXC03XUvuoBw2zmnPMqHstbb1ZTmOeQU8WKzIdhS'),
	(7, 'Srinivas', 'srinivas@gmail.com', '$2b$10$lv5q332EJWD.B21dl8O0G.4Nwd0WdRL5Uzk0W8ty8ovgmTSGAztCe');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
