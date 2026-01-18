-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: mern_ecommerce
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (5,1,5,24,'2026-01-12 11:24:41'),(6,1,4,2,'2026-01-17 06:45:38');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,1,'2026-01-12 09:39:05');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` int DEFAULT '0',
  `category` varchar(100) DEFAULT NULL,
  `stock` int DEFAULT '0',
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Wireless Mouse',999.00,10,'Electronics',25,'Ergonomic wireless mouse with long battery life','2026-01-02 13:44:26'),(2,'Wireless Mouse',999.00,10,'Electronics',50,'Ergonomic wireless mouse with long battery life','2026-01-12 11:24:09'),(3,'Mechanical Keyboard',2499.00,15,'Electronics',30,'RGB backlit mechanical keyboard','2026-01-12 11:24:09'),(4,'USB-C Hub',1499.00,5,'Accessories',40,'Multiport USB-C hub with HDMI support','2026-01-12 11:24:09'),(5,'Bluetooth Headphones',2999.00,20,'Electronics',25,'Noise cancelling bluetooth headphones','2026-01-12 11:24:09'),(6,'Smart Watch',3999.00,10,'Wearables',35,'Fitness tracking smart watch','2026-01-12 11:24:09'),(7,'Laptop Stand',899.00,0,'Accessories',60,'Adjustable aluminum laptop stand','2026-01-12 11:24:09'),(8,'Webcam HD',1899.00,12,'Electronics',20,'1080p HD webcam for meetings','2026-01-12 11:24:09'),(9,'Gaming Chair',7999.00,18,'Furniture',10,'Comfortable gaming chair with lumbar support','2026-01-12 11:24:09'),(10,'Portable SSD',5499.00,8,'Storage',15,'1TB high-speed portable SSD','2026-01-12 11:24:09'),(11,'Power Bank',1299.00,10,'Accessories',45,'10000mAh fast charging power bank','2026-01-12 11:24:09'),(12,'Desk Lamp',699.00,5,'Home',55,'LED desk lamp with brightness control','2026-01-12 11:24:09'),(13,'Wireless Charger',1199.00,12,'Accessories',35,'Fast wireless charging pad','2026-01-12 11:24:09'),(14,'Fitness Band',1999.00,15,'Wearables',28,'Heart rate and sleep monitor band','2026-01-12 11:24:09'),(15,'Router Dual Band',2599.00,7,'Networking',22,'High speed dual band router','2026-01-12 11:24:09'),(16,'External Hard Drive',4999.00,10,'Storage',18,'2TB external hard drive','2026-01-12 11:24:09'),(17,'Graphic Tablet',3499.00,6,'Electronics',12,'Digital drawing tablet','2026-01-12 11:24:09'),(18,'Smart Speaker',2999.00,14,'Electronics',27,'Voice assistant smart speaker','2026-01-12 11:24:09'),(19,'Office Table',9999.00,5,'Furniture',8,'Wooden office work table','2026-01-12 11:24:09'),(20,'Noise Cancelling Earbuds',3499.00,20,'Electronics',33,'True wireless ANC earbuds','2026-01-12 11:24:09'),(21,'Monitor 24 Inch',10999.00,9,'Electronics',14,'Full HD IPS monitor','2026-01-12 11:24:09'),(22,'Dress',2000.00,20,'Cloths',300,'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\" \"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...\"','2026-01-12 12:26:14'),(23,'Organic Brown Rice',120.00,10,'Grocery',50,'Healthy organic brown rice rich in fiber and nutrients.','2026-01-17 06:36:27');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Mohana Aditiyan P','mohana@test.com','$2b$10$iK2/gHuc78vG8.CpTU6sAuFryKyqkywxyqxkpVp0GKujYNvcinKuO','admin','2026-01-02 13:17:44');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-18 14:21:36
