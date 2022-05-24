-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2022 at 01:18 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookingcare`
--

-- --------------------------------------------------------

--
-- Table structure for table `allcodes`
--

CREATE TABLE `allcodes` (
  `id` int(11) NOT NULL,
  `keyMap` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valueVi` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valueEn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `allcodes`
--

INSERT INTO `allcodes` (`id`, `keyMap`, `type`, `valueVi`, `valueEn`, `createdAt`, `updatedAt`) VALUES
(1, 'R1', 'ROLE', 'Quản trị viên', 'Admin', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'R2', 'ROLE', 'Bác sĩ', 'Doctor', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'R3', 'ROLE', 'Bệnh nhân', 'Patient', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'S1', 'STATUS', 'Lịch hẹn mới', 'New', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'S2', 'STATUS', 'Đã xác nhận', 'Confirmed', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'S3', 'STATUS', 'Đã khám xong', 'Done', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'S4', 'STATUS', 'Đã hủy', 'Cancel', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'T1', 'TIME', '8:00 - 9:00', '8:00 AM - 9:00 AM', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'T2', 'TIME', '9:00 - 10:00', '9:00 AM - 10:00 AM', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'T3', 'TIME', '10:00 - 11:00', '10:00 AM - 11:00 AM', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'T4', 'TIME', '11:00 - 12:00', '11:00 AM - 0:00 PM', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'T5', 'TIME', '13:00 - 14:00', '1:00 PM - 2:00 PM', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'T6', 'TIME', '14:00 - 15:00', '2:00 PM - 3:00 PM', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'T7', 'TIME', '15:00 - 16:00', '3:00 PM - 4:00 PM', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'T8', 'TIME', '16:00 - 17:00', '4:00 PM - 5:00 PM', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'P0', 'POSITION', 'Bác sĩ', 'None', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'P1', 'POSITION', 'Thạc sĩ', 'Master', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'P2', 'POSITION', 'Tiến sĩ', 'Doctor', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'P3', 'POSITION', 'Phó giáo sư', 'Associate Professor', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'P4', 'POSITION', 'Giáo sư', 'Professor', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 'M', 'GENDER', 'Nam', 'Male', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 'F', 'GENDER', 'Nữ', 'Female', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 'O', 'GENDER', 'Khác', 'Other', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `statusId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `patientId` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `timeType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clinics`
--

CREATE TABLE `clinics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_clinic_specialty`
--

CREATE TABLE `doctor_clinic_specialty` (
  `id` int(11) NOT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `clinicId` int(11) DEFAULT NULL,
  `specialtyId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `patientId` int(11) DEFAULT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `files` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `markdowns`
--

CREATE TABLE `markdowns` (
  `id` int(11) NOT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `clinicId` int(11) DEFAULT NULL,
  `specialtyId` int(11) DEFAULT NULL,
  `contentHTML` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contentMarkdown` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `currentNumber` int(11) DEFAULT NULL,
  `maxNumber` int(11) DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  `timeType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220327064707-create-user.js'),
('20220328074428-add-columns-user.js'),
('20220328082056-create-allcode.js'),
('20220328083522-create-booking.js'),
('20220328084051-add-column-image-user.js'),
('20220328084238-create-clinic.js'),
('20220328085042-create-history.js'),
('20220328085423-create-schedule.js'),
('20220328085603-create-specialty.js'),
('20220328090039-create-doctor-clinic-specialty.js'),
('20220328090516-add-column-password-user.js'),
('20220328091503-delete-column-roleid-user.js'),
('20220328091621-add-columns-user.js'),
('20220328130753-delete-columns-user.js'),
('20220328130836-add-columns-user.js'),
('20220328131214-add-column-files-history.js'),
('20220328131326-add-column-name-clinic.js'),
('20220328131428-add-column-name-specialty.js'),
('20220414132747-rename-column-key-allcode.js'),
('20220421094134-change-data-type-column-gender-user.js'),
('20220428005725-change-data-type-column-image-user.js'),
('20220428052648-change-data-type-blob-image-user.js'),
('20220503055307-create-markdown.js'),
('20220524054558-change-data-type-column-date-schedule.js.js');

-- --------------------------------------------------------

--
-- Table structure for table `specialties`
--

CREATE TABLE `specialties` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `roleId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `positionId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` longblob DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `roleId`, `positionId`, `firstName`, `lastName`, `image`, `email`, `password`, `address`, `gender`, `phone`, `createdAt`, `updatedAt`) VALUES
(1, 'R1', 'P0', 'John', 'Doe', '', 'john@gmail.com', '$2a$10$xpFDK.WFvM.5MUKLBeazGOiI0jd8CsdmP1oehNt.K4eFRglTLZgse', 'Hoc Mon, TP. Ho Chi Minh', 'M', '0939584501', '2022-05-24 18:17:55', '2022-05-24 18:17:55'),
(2, 'R2', 'P1', 'Lena', 'Caron', '', 'lena@gmail.com', '$2a$10$xpFDK.WFvM.5MUKLBeazGOwrEX1pL6Q8Na6MgeGcClyE3lU36BVe6', 'Quan 1, TP. Ho Chi Minh', 'F', '0939584502', '2022-05-24 18:17:55', '2022-05-24 18:17:55'),
(3, 'R3', 'P2', 'Luke', 'Russell', '', 'luke@gmail.com', '$2a$10$xpFDK.WFvM.5MUKLBeazGOLfP4fGeA/qmtFD3lIlWNe8ajo6.rG5G', 'Tan Binh, TP. Ho Chi Minh', 'M', '0939584503', '2022-05-24 18:17:56', '2022-05-24 18:17:56'),
(4, 'R2', 'P3', 'Celine', 'Dion', '', 'celine@gmail.com', '$2a$10$xpFDK.WFvM.5MUKLBeazGOAhW.G4QW9R7YGw3BZquMg05UYh8ZBJq', 'Quan 5, TP. Ho Chi Minh', 'F', '0939584504', '2022-05-24 18:17:56', '2022-05-24 18:17:56'),
(5, 'R1', 'P4', 'Donal', 'Duck', '', 'donal@gmail.com', '$2a$10$xpFDK.WFvM.5MUKLBeazGOiIQcf78Z1KbFvnMAnRmQ4JOuk9zl1Gi', 'Quan 3, TP. Ho Chi Minh', 'M', '0939584505', '2022-05-24 18:17:56', '2022-05-24 18:17:56'),
(6, 'R2', 'P2', 'Smith', 'Cage', '', 'smith@gmail.com', '$2a$10$xpFDK.WFvM.5MUKLBeazGOjMELLOnqEq1GnZYtQWfhZQONTe3OFZa', 'Quan 6, TP. Ho Chi Minh', 'M', '0939584506', '2022-05-24 18:17:56', '2022-05-24 18:17:56'),
(7, 'R3', 'P1', 'Mac', 'Donald', '', 'mac@gmail.com', '$2a$10$xpFDK.WFvM.5MUKLBeazGOcEmWUYJ9wn4KCFVUhKXwTuD1GtDqur.', 'Quan 9, TP. Ho Chi Minh', 'M', '0939584507', '2022-05-24 18:17:56', '2022-05-24 18:17:56'),
(8, 'R2', 'P4', 'Laury', 'Prosacco', '', 'laury@gmail.com', '$2a$10$xpFDK.WFvM.5MUKLBeazGO5bUsOnnX.S7a0Fk6BFc3lRRfHY7IOSO', 'Binh Tan, TP. Ho Chi Minh', 'F', '0939584508', '2022-05-24 18:17:56', '2022-05-24 18:17:56'),
(9, 'R2', 'P0', 'Lavinia', 'Crist', '', 'lavinia@gmail.com', '$2a$10$xpFDK.WFvM.5MUKLBeazGOLR.EIEejekftS8vMqfEB1s3g1kp08QW', 'Binh Chanh, TP. Ho Chi Minh', 'F', '0939584509', '2022-05-24 18:17:56', '2022-05-24 18:17:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allcodes`
--
ALTER TABLE `allcodes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clinics`
--
ALTER TABLE `clinics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_clinic_specialty`
--
ALTER TABLE `doctor_clinic_specialty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `markdowns`
--
ALTER TABLE `markdowns`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `specialties`
--
ALTER TABLE `specialties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allcodes`
--
ALTER TABLE `allcodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clinics`
--
ALTER TABLE `clinics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctor_clinic_specialty`
--
ALTER TABLE `doctor_clinic_specialty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `markdowns`
--
ALTER TABLE `markdowns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `specialties`
--
ALTER TABLE `specialties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
