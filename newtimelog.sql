-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- 主機： db
-- 產生時間： 2019 年 06 月 16 日 14:52
-- 伺服器版本： 5.7.26
-- PHP 版本： 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `timelog`
--

-- --------------------------------------------------------

--
-- 資料表結構 `log`
--

CREATE TABLE `log` (
  `LogID` bigint(20) NOT NULL,
  `UserID` bigint(20) NOT NULL,
  `ProjectID` bigint(20) DEFAULT NULL,
  `Title` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `StartTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`LogID`),
  ADD KEY `LogProjectID` (`ProjectID`),
  ADD KEY `LogUserID` (`UserID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `log`
--
ALTER TABLE `log`
  MODIFY `LogID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `LogProjectID` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `LogUserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
