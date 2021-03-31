-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2021 at 10:54 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reitzel_insulation`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `AddressID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `Address` varchar(300) NOT NULL,
  `PostalCode` varchar(50) NOT NULL,
  `City` varchar(50) NOT NULL,
  `Province` varchar(50) NOT NULL,
  `Region` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`AddressID`, `CustomerID`, `Address`, `PostalCode`, `City`, `Province`, `Region`) VALUES
(1, 2, '1661 Circle St', 'N2Y1G6', 'Toronto', 'ON', 5),
(2, 2, '12111-A CN Tower', 'G3R1K9', 'Toronto', 'ON', 5),
(3, 3, '2226  Linden Avenue', 'NG7I8T', 'Paris', 'ON', 9);

-- --------------------------------------------------------

--
-- Table structure for table `addressnotes`
--

CREATE TABLE `addressnotes` (
  `NoteID` int(11) NOT NULL,
  `AddressID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Notes` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `addressnotes`
--

INSERT INTO `addressnotes` (`NoteID`, `AddressID`, `UserID`, `Notes`) VALUES
(1, 1, 3, 'Customer was rude'),
(2, 3, 2, 'Job Done!!'),
(3, 2, 1, 'Perfect!!');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `CustomerID` int(11) NOT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Phone` varchar(10) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `BillingAddress` varchar(300) NOT NULL,
  `City` varchar(50) NOT NULL,
  `PostalCode` varchar(6) NOT NULL,
  `Region` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`CustomerID`, `FirstName`, `LastName`, `Phone`, `Email`, `BillingAddress`, `City`, `PostalCode`, `Region`) VALUES
(1, 'Dheeraj', 'Arora', '1234567890', 'dheerajarora@gmail.com', '1211 Boardwalk', 'Kitchner', 'N2L3G2', 1),
(2, 'Andrew', 'Miller', '987654321', 'amill0519@gmail.com', '63 Mahogany Terr', 'Waterloo', 'N2L3G2', 8),
(3, 'John', 'Smith', '987356412', 'john@gmail.com', '196 NorthCrescent', 'Guelph', 'N2T3Y6', 7);

-- --------------------------------------------------------

--
-- Table structure for table `estimates`
--

CREATE TABLE `estimates` (
  `EstimateID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `AddressID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `JobType` varchar(50) NOT NULL,
  `CreationDate` date NOT NULL,
  `EstimateInfo` varchar(600) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `RegionID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `estimates`
--

INSERT INTO `estimates` (`EstimateID`, `CustomerID`, `AddressID`, `UserID`, `JobType`, `CreationDate`, `EstimateInfo`, `startDate`, `endDate`, `RegionID`) VALUES
(1, 2, 1, 3, 'Foam', '2021-03-02', 'Check out old foam and replace', '2021-03-02 18:40:11', '2021-03-02 19:40:11', 1),
(2, 2, 2, 4, ' loosefill', '2021-03-02', 'New Insulation', '2021-03-02 15:41:22', '2021-03-02 16:41:22', 2);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `InvoiceID` int(11) NOT NULL,
  `AddressID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `WorkID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `InvoiceInfo` varchar(600) NOT NULL,
  `InvoiceAmount` double NOT NULL,
  `notesCustomers` varchar(600) NOT NULL,
  `notesInstallers` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `PhotoID` int(11) NOT NULL,
  `AddressID` int(11) NOT NULL,
  `WorkID` int(11) NOT NULL,
  `Description` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `quotelines`
--

CREATE TABLE `quotelines` (
  `QuoteLineID` int(11) NOT NULL,
  `QuoteID` int(11) NOT NULL,
  `Product` varchar(600) NOT NULL,
  `Notes` varchar(600) NOT NULL,
  `Subtotal` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quotelines`
--

INSERT INTO `quotelines` (`QuoteLineID`, `QuoteID`, `Product`, `Notes`, `Subtotal`) VALUES
(1, 2, 'Product 1', 'Product 1 Notes', 100),
(2, 2, 'Product 2', 'Product 2 Notes', 100),
(3, 1, 'Product 11', 'Product 11 Notes', 100),
(4, 1, 'Product 12', 'Product 12 Notes', 250);

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `QuoteID` int(11) NOT NULL,
  `AddressID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `EstimateID` int(11) NOT NULL,
  `QuoteInfo` varchar(600) NOT NULL,
  `QuoteTotal` double NOT NULL,
  `notesCustomers` varchar(600) NOT NULL,
  `notesInstallers` varchar(600) NOT NULL,
  `creationDate` date NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`QuoteID`, `AddressID`, `CustomerID`, `UserID`, `EstimateID`, `QuoteInfo`, `QuoteTotal`, `notesCustomers`, `notesInstallers`, `creationDate`, `startDate`, `endDate`) VALUES
(1, 1, 2, 2, 2, 'We will supply and install “Insulthane Extreme, 2 lb medium density, closed cell, polyurethane spray foam thermal insulation. CCMC # 13697-L” (Default) (Option - “Wrapsulate 1100, 1 lb low density, open cell, polyurethane spray foam thermal insulation. CCMC# 14049-R”)', 200, 'Please be aware that manufacturer requests house be unoccupied for up to 24 hours after the application and should be covered in living space with a thermal barrier i.e. Drywall or fireproof coating. ', 'Bring all the tools', '2021-03-02', '2021-03-02 13:00:00', '2021-03-02 14:00:00'),
(2, 2, 2, 1, 1, 'We will supply and install Thermocomfort vermin resistant blown cellulose insulation to the wall cavities. CCMC # 08774-L. This process includes drilling 2-3, 2 inch holes per cavity and filling with cellulose. Reitzel Insulation is responsible to plug and patch the holes with the first layer of sheetrock 90. Reitzel Insulation cannot be held liable for poor wall make-up. The customer is responsible to refinish the wall as they see fixed.', 350, 'All tools, debris and personal belongings need to be moved at least 6 feet away from the application area to allow our crew to complete their work. All pictures and wall hangings need to be removed prior to the arrival of our crew.', 'Have a good time', '2021-03-02', '2021-03-02 15:57:08', '2021-03-02 16:57:08');

-- --------------------------------------------------------

--
-- Table structure for table `region`
--

CREATE TABLE `region` (
  `RegionID` int(11) NOT NULL,
  `Region` varchar(100) NOT NULL,
  `Color` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `region`
--

INSERT INTO `region` (`RegionID`, `Region`, `Color`) VALUES
(1, 'Elmira & area ', '#cf9774'),
(2, 'Guelph & area', '#9ca7ff'),
(3, 'Cambridge & area', '#ff7570'),
(4, 'Hamilton & area', '#c48d72'),
(5, 'Stratford & area', '#913800'),
(6, 'Listowel area', '#4f2b19'),
(7, 'Greater Toronto area', '#00065e'),
(8, 'Kitchener - Waterloo', '#ff852e'),
(9, 'Brantford, Paris, Burford, Waterford, Brant Country, Haldmald, Caledonia', '#6b0000');

-- --------------------------------------------------------

--
-- Table structure for table `subtotallines`
--

CREATE TABLE `subtotallines` (
  `subtotalID` int(11) NOT NULL,
  `invoiceID` int(11) NOT NULL,
  `subtotalNotes` varchar(600) NOT NULL,
  `subtotalAmount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `SecurityLevel` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `FirstName`, `LastName`, `Email`, `Password`, `SecurityLevel`) VALUES
(1, 'John', 'Black', 'jb@gmail.com', 'jb@gmail.com', 'salesman'),
(2, 'Curtz', 'Smith', 'csmith@gmail.com', 'csmith@gmail.com', 'salesman'),
(3, 'Mellisa', 'Curtz', 'melcurt@gmail.com', 'melcurt@gmail.com', 'trucklead'),
(4, 'Simon', 'Smith', 'simon@gmail.com', 'simon@gmail.com', 'admin'),
(5, 'Lianne', 'Ward', 'lward@gmail.com', 'lward@gmail.com', 'manager'),
(24, 'Sample', 'Sample', 'sample', 'sample', 'sample');

-- --------------------------------------------------------

--
-- Table structure for table `worklines`
--

CREATE TABLE `worklines` (
  `workLineID` int(11) NOT NULL,
  `workID` int(11) NOT NULL,
  `workLineNotes` varchar(600) NOT NULL,
  `subtotalAmount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workorders`
--

CREATE TABLE `workorders` (
  `WorkID` int(11) NOT NULL,
  `AddressID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `QuoteID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `WorkInfo` varchar(600) NOT NULL,
  `creationDate` date NOT NULL,
  `notesInstallers` varchar(600) NOT NULL,
  `workTotal` double NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`AddressID`),
  ADD KEY `CustomerID_Index` (`CustomerID`) USING BTREE;

--
-- Indexes for table `addressnotes`
--
ALTER TABLE `addressnotes`
  ADD PRIMARY KEY (`NoteID`),
  ADD KEY `AddressID_FK` (`AddressID`),
  ADD KEY `UserID_FK` (`UserID`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`CustomerID`);

--
-- Indexes for table `estimates`
--
ALTER TABLE `estimates`
  ADD PRIMARY KEY (`EstimateID`),
  ADD KEY `AddressID_FK_3` (`AddressID`),
  ADD KEY `CustomerId_FK_2` (`CustomerID`),
  ADD KEY `UserID_FK_2` (`UserID`),
  ADD KEY `RegionID_FK` (`RegionID`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`InvoiceID`),
  ADD KEY `notesInstallers` (`notesInstallers`),
  ADD KEY `AddressID_FK_6` (`AddressID`),
  ADD KEY `CustomerID_FK_5` (`CustomerID`),
  ADD KEY `UserID_FK_5` (`UserID`),
  ADD KEY `WorkID_FK` (`WorkID`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`PhotoID`),
  ADD KEY `AddressID_FK_2` (`AddressID`),
  ADD KEY `WorkID` (`WorkID`);

--
-- Indexes for table `quotelines`
--
ALTER TABLE `quotelines`
  ADD PRIMARY KEY (`QuoteLineID`),
  ADD KEY `QuoteID` (`QuoteID`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`QuoteID`),
  ADD KEY `AddressID_FK_4` (`AddressID`),
  ADD KEY `CustomerID_FK_3` (`CustomerID`),
  ADD KEY `EstimateID_FK` (`EstimateID`),
  ADD KEY `UserID_FK_3` (`UserID`);

--
-- Indexes for table `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`RegionID`);

--
-- Indexes for table `subtotallines`
--
ALTER TABLE `subtotallines`
  ADD PRIMARY KEY (`subtotalID`),
  ADD KEY `InvoiceID_FK` (`invoiceID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `worklines`
--
ALTER TABLE `worklines`
  ADD PRIMARY KEY (`workLineID`),
  ADD KEY `workID` (`workID`);

--
-- Indexes for table `workorders`
--
ALTER TABLE `workorders`
  ADD PRIMARY KEY (`WorkID`),
  ADD KEY `AddressID_FK_5` (`AddressID`),
  ADD KEY `CustomerID_FK_4` (`CustomerID`),
  ADD KEY `QuoteID_FK` (`QuoteID`),
  ADD KEY `UserID_FK_4` (`UserID`),
  ADD KEY `notesInstaller_FK` (`notesInstallers`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `AddressID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `addressnotes`
--
ALTER TABLE `addressnotes`
  MODIFY `NoteID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `estimates`
--
ALTER TABLE `estimates`
  MODIFY `EstimateID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `InvoiceID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `PhotoID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quotelines`
--
ALTER TABLE `quotelines`
  MODIFY `QuoteLineID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `QuoteID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `region`
--
ALTER TABLE `region`
  MODIFY `RegionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `subtotallines`
--
ALTER TABLE `subtotallines`
  MODIFY `subtotalID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `worklines`
--
ALTER TABLE `worklines`
  MODIFY `workLineID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workorders`
--
ALTER TABLE `workorders`
  MODIFY `WorkID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `CustomerId_FK` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`);

--
-- Constraints for table `addressnotes`
--
ALTER TABLE `addressnotes`
  ADD CONSTRAINT `AddressID_FK` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`),
  ADD CONSTRAINT `UserID_FK` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `estimates`
--
ALTER TABLE `estimates`
  ADD CONSTRAINT `AddressID_FK_3` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`),
  ADD CONSTRAINT `CustomerId_FK_2` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`),
  ADD CONSTRAINT `RegionID_FK` FOREIGN KEY (`RegionID`) REFERENCES `region` (`RegionID`),
  ADD CONSTRAINT `UserID_FK_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `AddressID_FK_6` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`),
  ADD CONSTRAINT `CustomerID_FK_5` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`),
  ADD CONSTRAINT `UserID_FK_5` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `WorkID_FK` FOREIGN KEY (`WorkID`) REFERENCES `workorders` (`WorkID`);

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `AddressID_FK_2` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`),
  ADD CONSTRAINT `WorkID_FK_3` FOREIGN KEY (`WorkID`) REFERENCES `workorders` (`WorkID`);

--
-- Constraints for table `quotelines`
--
ALTER TABLE `quotelines`
  ADD CONSTRAINT `QuoteID_FK_1` FOREIGN KEY (`QuoteID`) REFERENCES `quotes` (`QuoteID`);

--
-- Constraints for table `quotes`
--
ALTER TABLE `quotes`
  ADD CONSTRAINT `AddressID_FK_4` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`),
  ADD CONSTRAINT `CustomerID_FK_3` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`),
  ADD CONSTRAINT `EstimateID_FK` FOREIGN KEY (`EstimateID`) REFERENCES `estimates` (`EstimateID`),
  ADD CONSTRAINT `UserID_FK_3` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `subtotallines`
--
ALTER TABLE `subtotallines`
  ADD CONSTRAINT `InvoiceID_FK` FOREIGN KEY (`invoiceID`) REFERENCES `invoices` (`InvoiceID`);

--
-- Constraints for table `worklines`
--
ALTER TABLE `worklines`
  ADD CONSTRAINT `WorkID_FK_2` FOREIGN KEY (`workID`) REFERENCES `workorders` (`WorkID`);

--
-- Constraints for table `workorders`
--
ALTER TABLE `workorders`
  ADD CONSTRAINT `AddressID_FK_5` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`),
  ADD CONSTRAINT `CustomerID_FK_4` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`),
  ADD CONSTRAINT `QuoteID_FK` FOREIGN KEY (`QuoteID`) REFERENCES `quotes` (`QuoteID`),
  ADD CONSTRAINT `UserID_FK_4` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `notesInstaller_FK` FOREIGN KEY (`notesInstallers`) REFERENCES `invoices` (`notesInstallers`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
