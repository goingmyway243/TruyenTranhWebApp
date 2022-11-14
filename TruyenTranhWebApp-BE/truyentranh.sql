-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: truyentranh
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `author` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'Hiroki'),(2,'Sawano'),(3,'Kayaba'),(4,'Hinata'),(5,'Kinugasa Shougo'),(6,'Đang cập nhật');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter`
--

DROP TABLE IF EXISTS `chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chapter` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `chapter_index` int(11) NOT NULL,
  `comic_id` bigint(20) NOT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `comicId` (`comic_id`),
  CONSTRAINT `chapter_ibfk_1` FOREIGN KEY (`comic_id`) REFERENCES `comic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter`
--

LOCK TABLES `chapter` WRITE;
/*!40000 ALTER TABLE `chapter` DISABLE KEYS */;
INSERT INTO `chapter` VALUES (1,'Khởi đầu',1,1,'2022-11-10 00:50:45'),(2,'Bạn mới',2,16,'2022-11-10 21:53:07'),(3,'Khởi đầu',1,16,'2022-11-10 21:53:07'),(12,'Bạn mới',2,22,'2022-11-10 23:45:56'),(13,'Khởi đầu',1,22,'2022-11-10 23:45:56'),(14,'Bạn mới',2,23,'2022-11-12 00:12:29'),(15,'Khởi đầu',1,23,'2022-11-12 00:12:29'),(17,'Khởi đầu',0,25,'2022-11-12 00:30:37'),(18,'Bạn mới',2,26,'2022-11-12 00:42:35'),(19,'Khởi đầu',1,26,'2022-11-12 00:42:35'),(20,'Dịch chuyển',1,27,'2022-11-12 00:50:44'),(21,'Trổ tài',2,27,'2022-11-12 00:50:44'),(22,'Nấu ăn',3,27,'2022-11-12 00:50:44');
/*!40000 ALTER TABLE `chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comic`
--

DROP TABLE IF EXISTS `comic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comic` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `view` bigint(20) NOT NULL,
  `status` enum('PENDING','PUBLISH','UNPUBLISH','REJECTED') NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `author_id` bigint(20) NOT NULL,
  `created_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`user_id`),
  KEY `authorId` (`author_id`),
  CONSTRAINT `comic_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `comic_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comic`
--

LOCK TABLES `comic` WRITE;
/*!40000 ALTER TABLE `comic` DISABLE KEYS */;
INSERT INTO `comic` VALUES (1,'Test','Test desc',0,'PENDING',1,3,'2022-11-04 00:13:17'),(2,'Test 2','Truyện tranh tình cảm nhẹ nhàng',0,'PENDING',1,4,'2022-11-04 00:49:14'),(8,'Merry Christmas','Xmas ei',0,'PENDING',1,4,'2022-11-09 22:51:21'),(9,'Yokoso','Test chapter',0,'PENDING',1,5,'2022-11-09 22:53:34'),(16,'Test kết quả','fsadsad',0,'PENDING',1,5,'2022-11-10 21:53:07'),(22,'Yokoso Jiysuryoku','Câu chuyện về Ayano Kyouji viết thư pháp bá chủ ngôi trường',0,'PENDING',1,5,'2022-11-10 23:45:56'),(23,'Yokoso Jiysuryoku 1','dsad',0,'PENDING',1,5,'2022-11-12 00:12:29'),(25,'Yokoso Jiysuryoku 2131','dsad',0,'PENDING',1,5,'2022-11-12 00:30:37'),(26,'Yokoso Jiysuryoku','dsadsad',0,'PENDING',1,5,'2022-11-12 00:42:35'),(27,'TENSEI SHITE INAKA DE SLOWLIFE WO OKURITAI','Nhân vật chính của chúng ta, Inaka Yuuji do làm việc quá nhiều nên đã kiệt sức và bị truck-sama thông nhầm tông. Được tái sinh, Inaka Yuuji quyết định sẽ sống một cuộc sống nhàn nhã ở một vùng quê với hình dáng đứa trẻ 3 tuổi...',0,'PENDING',1,6,'2022-11-12 00:50:44');
/*!40000 ALTER TABLE `comic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comic_genre`
--

DROP TABLE IF EXISTS `comic_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comic_genre` (
  `comic_id` bigint(20) NOT NULL,
  `genre_id` bigint(20) NOT NULL,
  PRIMARY KEY (`comic_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `comic_genre_ibfk_1` FOREIGN KEY (`comic_id`) REFERENCES `comic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comic_genre_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comic_genre`
--

LOCK TABLES `comic_genre` WRITE;
/*!40000 ALTER TABLE `comic_genre` DISABLE KEYS */;
INSERT INTO `comic_genre` VALUES (2,1),(2,2),(8,1),(8,2),(9,1),(9,3),(16,1),(16,2),(22,1),(22,2),(23,2),(23,3),(25,2),(25,3),(26,1),(26,2),(27,1),(27,2);
/*!40000 ALTER TABLE `comic_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` mediumtext NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `chapter_id` bigint(20) NOT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `chapter_id` (`chapter_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `content` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) NOT NULL,
  `content_index` int(11) NOT NULL,
  `chapter_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `chapterId` (`chapter_id`),
  CONSTRAINT `content_ibfk_1` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (7,'000.jpg',0,13),(8,'001.jpg',1,13),(9,'000.jpg',0,12),(10,'000.jpg',0,14),(11,'001.jpg',1,14),(12,'000.jpg',0,15),(16,'000.jpg',0,17),(17,'001.jpg',1,17),(18,'002.jpg',2,17),(19,'000.jpg',0,18),(20,'001.jpg',1,18),(21,'000.jpg',0,19),(22,'000.jpg',0,20),(23,'001.jpg',1,20),(24,'002.jpg',2,20),(25,'000.jpg',0,22),(26,'001.jpg',1,22),(27,'002.jpg',2,22),(28,'000.jpg',0,21);
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genre` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Hài hước'),(2,'Lãng mạn'),(3,'Hành động'),(4,'Kinh dị'),(5,'Harem'),(6,'Chuyển sinh');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `user_id` bigint(20) NOT NULL,
  `comic_id` bigint(20) NOT NULL,
  `type` enum('LIKE','DISLIKE') NOT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`,`comic_id`),
  KEY `comicId` (`comic_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`comic_id`) REFERENCES `comic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(24) NOT NULL,
  `email` varchar(320) NOT NULL,
  `pass` varchar(128) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'sysadmin','sysadmin@gmail.com','123','ADMIN'),(2,'Tester','test@gmail.com','123','USER'),(3,'Nguyễn Hải Đăng','nguyenhaidang240800@gmail.com','123','USER'),(4,'Người dùng mới','user@gmail.com','123','USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-15  0:11:33
