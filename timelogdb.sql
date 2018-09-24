-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2018 年 09 月 24 日 09:56
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
-- 資料庫： `timelogdb`
--

-- --------------------------------------------------------

--
-- 資料表結構 `log`
--

CREATE TABLE `log` (
  `LogID` int(11) NOT NULL,
  `FBUserID` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Tags` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `SprintID` int(11) DEFAULT NULL,
  `Title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Date` date NOT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL,
  `Description` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `sprint`
--

CREATE TABLE `sprint` (
  `SprintID` int(11) NOT NULL,
  `SprintName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `TeamID` int(11) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `Content` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `tag`
--

CREATE TABLE `tag` (
  `TagID` int(11) NOT NULL,
  `FBUserID` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `TagName` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `target`
--

CREATE TABLE `target` (
  `UserID` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `SprintID` int(11) NOT NULL,
  `TagID` int(11) NOT NULL,
  `TargetHour` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `team`
--

CREATE TABLE `team` (
  `TeamID` int(11) NOT NULL,
  `TeamName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `TeamPwd` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `NowSprint` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `FBUserID` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `UserName` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Mail` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Team` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`LogID`),
  ADD KEY `log_fbUserID` (`FBUserID`);

--
-- 資料表索引 `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`SprintID`),
  ADD KEY `sprint_teamID` (`TeamID`);

--
-- 資料表索引 `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`TagID`),
  ADD KEY `tag_fbUserID` (`FBUserID`);

--
-- 資料表索引 `target`
--
ALTER TABLE `target`
  ADD UNIQUE KEY `UserID` (`UserID`,`SprintID`,`TagID`) USING BTREE,
  ADD KEY `target_SprintID` (`SprintID`),
  ADD KEY `target_TagID` (`TagID`);

--
-- 資料表索引 `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`TeamID`),
  ADD KEY `team_nowSprint` (`NowSprint`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`FBUserID`),
  ADD KEY `user_TeamID` (`Team`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `log`
--
ALTER TABLE `log`
  MODIFY `LogID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表 AUTO_INCREMENT `sprint`
--
ALTER TABLE `sprint`
  MODIFY `SprintID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表 AUTO_INCREMENT `tag`
--
ALTER TABLE `tag`
  MODIFY `TagID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表 AUTO_INCREMENT `team`
--
ALTER TABLE `team`
  MODIFY `TeamID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `log_fbUserID` FOREIGN KEY (`FBUserID`) REFERENCES `user` (`FBUserID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- 資料表的 Constraints `sprint`
--
ALTER TABLE `sprint`
  ADD CONSTRAINT `sprint_teamID` FOREIGN KEY (`TeamID`) REFERENCES `team` (`TeamID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的 Constraints `tag`
--
ALTER TABLE `tag`
  ADD CONSTRAINT `tag_fbUserID` FOREIGN KEY (`FBUserID`) REFERENCES `user` (`FBUserID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- 資料表的 Constraints `target`
--
ALTER TABLE `target`
  ADD CONSTRAINT `target_SprintID` FOREIGN KEY (`SprintID`) REFERENCES `sprint` (`SprintID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `target_TagID` FOREIGN KEY (`TagID`) REFERENCES `tag` (`TagID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `target_UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`FBUserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的 Constraints `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `team_nowSprint` FOREIGN KEY (`NowSprint`) REFERENCES `sprint` (`SprintID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- 資料表的 Constraints `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_TeamID` FOREIGN KEY (`Team`) REFERENCES `team` (`TeamID`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
