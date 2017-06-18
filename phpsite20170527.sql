-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 05 月 27 日 08:54
-- 服务器版本: 5.5.44
-- PHP 版本: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `phpsite`
--
CREATE DATABASE IF NOT EXISTS `phpsite` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpsite`;

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `NewsID` int(11) NOT NULL,
  `Title` varchar(100) COLLATE utf8_bin NOT NULL,
  `SubTtile` varchar(100) COLLATE utf8_bin NOT NULL,
  `Authors` varchar(50) COLLATE utf8_bin NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(50) COLLATE utf8_bin NOT NULL,
  `Contents` longtext COLLATE utf8_bin NOT NULL,
  `ImgUrl` varchar(150) COLLATE utf8_bin NOT NULL,
  `PublicDate` varchar(50) COLLATE utf8_bin NOT NULL,
  `Source` varchar(50) COLLATE utf8_bin NOT NULL,
  `SourceUrl` varchar(150) COLLATE utf8_bin NOT NULL,
  `Editor` varchar(50) COLLATE utf8_bin NOT NULL,
  `ViewTimes` int(11) NOT NULL,
  `GoodTimes` int(11) NOT NULL,
  PRIMARY KEY (`NewsID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `newscategory`
--

CREATE TABLE IF NOT EXISTS `newscategory` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(50) COLLATE utf8_bin NOT NULL,
  `LevelNo` int(11) NOT NULL,
  `ParentCategoryID` int(11) NOT NULL,
  `CreateTime` varchar(30) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `newscategory`
--

INSERT INTO `newscategory` (`CategoryID`, `CategoryName`, `LevelNo`, `ParentCategoryID`, `CreateTime`) VALUES
(1, '学校新闻', 1, 0, '2017-05-15'),
(2, '教务新闻', 1, 0, '2017-05-15'),
(3, '媒体报到', 2, 1, '2017-5-27');

-- --------------------------------------------------------

--
-- 表的结构 `systemusers`
--

CREATE TABLE IF NOT EXISTS `systemusers` (
  `username` varchar(50) COLLATE utf8_bin NOT NULL,
  `truename` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(50) COLLATE utf8_bin NOT NULL,
  `registerTime` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `systemusers`
--

INSERT INTO `systemusers` (`username`, `truename`, `password`, `registerTime`) VALUES
('admin', '系统管理员', '123456', '2017-4-12');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
