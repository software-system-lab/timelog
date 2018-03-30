-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2018-03-30 09:47:16
-- 伺服器版本: 10.1.30-MariaDB
-- PHP 版本： 7.2.2

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
-- 資料表結構 `record`
--

CREATE TABLE `record` (
  `RecordID` int(11) NOT NULL,
  `User` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Tag` int(11) DEFAULT NULL,
  `Time_start` datetime NOT NULL,
  `Time_until` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `expires` float NOT NULL,
  `data` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `team`
--

CREATE TABLE `team` (
  `TeamName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `owner` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `typetag`
--

CREATE TABLE `typetag` (
  `TagID` int(11) NOT NULL,
  `User` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `ID` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '學號/員編',
  `Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Mail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Team` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` int(1) NOT NULL DEFAULT '0' COMMENT '2為admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`RecordID`),
  ADD KEY `user` (`User`),
  ADD KEY `tag` (`Tag`);

--
-- 資料表索引 `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`TeamName`),
  ADD KEY `owner` (`owner`);

--
-- 資料表索引 `typetag`
--
ALTER TABLE `typetag`
  ADD PRIMARY KEY (`TagID`),
  ADD KEY `userTag` (`User`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `project` (`Team`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `record`
--
ALTER TABLE `record`
  MODIFY `RecordID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表 AUTO_INCREMENT `typetag`
--
ALTER TABLE `typetag`
  MODIFY `TagID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `tag` FOREIGN KEY (`Tag`) REFERENCES `record` (`RecordID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `user` FOREIGN KEY (`User`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的 Constraints `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `owner` FOREIGN KEY (`owner`) REFERENCES `user` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- 資料表的 Constraints `typetag`
--
ALTER TABLE `typetag`
  ADD CONSTRAINT `userTag` FOREIGN KEY (`User`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的 Constraints `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `project` FOREIGN KEY (`Team`) REFERENCES `team` (`TeamName`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
