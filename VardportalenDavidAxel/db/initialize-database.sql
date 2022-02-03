CREATE TABLE IF NOT EXISTS users(
    userID INT AUTO_INCREMENT PRIMARY KEY,
    socialSecurityNumber VARCHAR (12) NOT NULL,
    userPassword VARCHAR (30) NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    isDoctor BOOLEAN DEFAULT '0',
    isAdmin BOOLEAN DEFAULT '0'
);

 CREATE TABLE IF NOT EXISTS specialitys(
    specialityID INT AUTO_INCREMENT PRIMARY KEY,
    specialityName VARCHAR(250)
);

 CREATE TABLE IF NOT EXISTS bookings(
    bookingID INT AUTO_INCREMENT PRIMARY KEY,
    appointmentTime VARCHAR(20),
    appointmentDate VARCHAR(20),
    messageFromPatient VARCHAR(250),
    categoryID INT,
    doctorID INT,
    patientID INT,
    FOREIGN KEY (categoryID) REFERENCES specialitys(specialityID),
    FOREIGN KEY (doctorID) REFERENCES users(userID),
    FOREIGN KEY (patientID) REFERENCES users(userID)
);


INSERT INTO `users` (`userID`, `socialSecurityNumber`, `userPassword`, `firstName`, `lastName`, `isDoctor`, `isAdmin`)
VALUES
	(1, '2000','123', 'axel', 'tiger', 1, 1),
	(2, '1997','123', 'david', 'wenn', 0, 1),
	(3, '1998','123', 'gustaf', 'sanderbajs', 1, 0),
	(4, '1999','123', 'andrey', 'arr', 0, 0),
	(5, '2001','123', 'sandra', 'nis', 0, 0);
    
INSERT INTO `specialitys` (`specialityID`, `specialityName`)
VALUES
	(1, 'Vaccinering'),
	(2, 'Skada'),
	(3, 'Rehab');

INSERT INTO `bookings` (`bookingID`, `appointmentTime`, `appointmentDate`, `messageFromPatient`, `categoryID`, `doctorID`, `patientID`)
VALUES
	(1, '09:19', '22/2/2022', 'vill ta min 1a dos covid 19 vaccin', 1, 1, 4);
