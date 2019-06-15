-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2019 年 06 月 15 日 11:44
-- 伺服器版本: 10.1.33-MariaDB
-- PHP 版本： 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `newtimelog`
--
CREATE DATABASE IF NOT EXISTS `newtimelog` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `newtimelog`;

-- --------------------------------------------------------

--
-- 資料表結構 `goal`
--
-- 建立時間: 2019 年 06 月 15 日 09:19
--

CREATE TABLE `goal` (
  `GoalID` bigint(20) NOT NULL,
  `IterationID` bigint(20) NOT NULL,
  `ProjectID` bigint(20) NOT NULL,
  `GoalHour` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的關聯 `goal`:
--   `IterationID`
--       `iteration` -> `IterationID`
--   `ProjectID`
--       `project` -> `ProjectID`
--

-- --------------------------------------------------------

--
-- 資料表結構 `iteration`
--
-- 建立時間: 2019 年 06 月 15 日 09:39
--

CREATE TABLE `iteration` (
  `IterationID` bigint(20) NOT NULL,
  `UserID` bigint(20) NOT NULL,
  `IterationName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `Content` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IsDeleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的關聯 `iteration`:
--   `UserID`
--       `user` -> `UserID`
--

-- --------------------------------------------------------

--
-- 資料表結構 `log`
--
-- 建立時間: 2019 年 06 月 15 日 09:38
--

CREATE TABLE `log` (
  `LogID` bigint(20) NOT NULL,
  `UserID` bigint(20) NOT NULL,
  `ProjectID` bigint(20) NOT NULL,
  `Title` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `StartTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IsDeleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的關聯 `log`:
--   `ProjectID`
--       `project` -> `ProjectID`
--   `UserID`
--       `user` -> `UserID`
--

-- --------------------------------------------------------

--
-- 資料表結構 `project`
--
-- 建立時間: 2019 年 06 月 15 日 09:15
--

CREATE TABLE `project` (
  `ProjectID` bigint(20) NOT NULL,
  `UserID` bigint(20) NOT NULL,
  `IsPrivate` tinyint(1) NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL,
  `IsEnable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的關聯 `project`:
--   `UserID`
--       `user` -> `UserID`
--

-- --------------------------------------------------------

--
-- 資料表結構 `team`
--
-- 建立時間: 2019 年 06 月 15 日 09:22
--

CREATE TABLE `team` (
  `TeamID` bigint(20) NOT NULL,
  `TeamName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `TeamAccessCode` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Joinable` tinyint(1) NOT NULL,
  `CreatorID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的關聯 `team`:
--   `CreatorID`
--       `user` -> `UserID`
--

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--
-- 建立時間: 2019 年 06 月 15 日 09:00
--

CREATE TABLE `user` (
  `UserID` bigint(20) NOT NULL,
  `AccountID` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `FBID` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `UserName` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Mail` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Phone` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CurrentIterationID` bigint(20) NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的關聯 `user`:
--   `CurrentIterationID`
--       `iteration` -> `IterationID`
--

-- --------------------------------------------------------

--
-- 資料表結構 `userteammapping`
--
-- 建立時間: 2019 年 06 月 15 日 09:26
--

CREATE TABLE `userteammapping` (
  `UserTeamMappingID` bigint(20) NOT NULL,
  `UserID` bigint(20) NOT NULL,
  `TeamID` bigint(20) NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的關聯 `userteammapping`:
--   `TeamID`
--       `team` -> `TeamID`
--   `UserID`
--       `user` -> `UserID`
--

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `goal`
--
ALTER TABLE `goal`
  ADD PRIMARY KEY (`GoalID`),
  ADD KEY `GoalIterationID` (`IterationID`),
  ADD KEY `GoalProjecttID` (`ProjectID`);

--
-- 資料表索引 `iteration`
--
ALTER TABLE `iteration`
  ADD PRIMARY KEY (`IterationID`),
  ADD KEY `IterationUserID` (`UserID`);

--
-- 資料表索引 `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`LogID`),
  ADD KEY `LogProjectID` (`ProjectID`),
  ADD KEY `LogUserID` (`UserID`);

--
-- 資料表索引 `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`ProjectID`),
  ADD KEY `OwnerID` (`UserID`);

--
-- 資料表索引 `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`TeamID`),
  ADD KEY `CreatorID` (`CreatorID`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `AccountID` (`AccountID`),
  ADD KEY `IterationID` (`CurrentIterationID`);

--
-- 資料表索引 `userteammapping`
--
ALTER TABLE `userteammapping`
  ADD PRIMARY KEY (`UserTeamMappingID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `TeamID` (`TeamID`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `goal`
--
ALTER TABLE `goal`
  MODIFY `GoalID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表 AUTO_INCREMENT `iteration`
--
ALTER TABLE `iteration`
  MODIFY `IterationID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表 AUTO_INCREMENT `log`
--
ALTER TABLE `log`
  MODIFY `LogID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表 AUTO_INCREMENT `project`
--
ALTER TABLE `project`
  MODIFY `ProjectID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表 AUTO_INCREMENT `team`
--
ALTER TABLE `team`
  MODIFY `TeamID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表 AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `UserID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表 AUTO_INCREMENT `userteammapping`
--
ALTER TABLE `userteammapping`
  MODIFY `UserTeamMappingID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `goal`
--
ALTER TABLE `goal`
  ADD CONSTRAINT `GoalIterationID` FOREIGN KEY (`IterationID`) REFERENCES `iteration` (`IterationID`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `GoalProjecttID` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`) ON UPDATE NO ACTION;

--
-- 資料表的 Constraints `iteration`
--
ALTER TABLE `iteration`
  ADD CONSTRAINT `IterationUserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON UPDATE NO ACTION;

--
-- 資料表的 Constraints `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `LogProjectID` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `LogUserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON UPDATE NO ACTION;

--
-- 資料表的 Constraints `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `OwnerID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON UPDATE NO ACTION;

--
-- 資料表的 Constraints `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `CreatorID` FOREIGN KEY (`CreatorID`) REFERENCES `user` (`UserID`) ON UPDATE NO ACTION;

--
-- 資料表的 Constraints `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `IterationID` FOREIGN KEY (`CurrentIterationID`) REFERENCES `iteration` (`IterationID`) ON UPDATE CASCADE;

--
-- 資料表的 Constraints `userteammapping`
--
ALTER TABLE `userteammapping`
  ADD CONSTRAINT `TeamID` FOREIGN KEY (`TeamID`) REFERENCES `team` (`TeamID`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
