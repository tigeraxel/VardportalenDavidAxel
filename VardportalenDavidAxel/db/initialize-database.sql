CREATE TABLE IF NOT EXISTS users(
    userID INT AUTO_INCREMENT PRIMARY KEY,
    socialSecurityNumber VARCHAR (12) NOT NULL,
    userPassword VARCHAR (30) NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    phoneNumber VARCHAR(30) NOT NULL,
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


INSERT INTO `users` (`userID`, `socialSecurityNumber`, `userPassword`, `firstName`, `lastName`,`email`,`phoneNumber`, `isDoctor`, `isAdmin`)
VALUES
	(1, '2000','123', 'axel', 'tiger',"sskdjs@gmail.com","07039374727", 1, 1),
	(2, '1997','123', 'david', 'wenn',"tjeooo@gmail.com","070394758327", 0, 1),
	(3, '1998','123', 'gustaf', 'sanderbajs',"sanderbrajjs@gmail.com","07394834727", 1, 0),
	(4, '1999','123', 'andrey', 'arr',"arr@gmail.com","0733474727", 0, 0),
    (5, '2003','123', 'sebbe', 'santa',"asanta@gmail.com","07538483943", 1, 1),
    (6, '2004','123', 'felix', 'sun',"sun@gmail.com","0754383833", 1, 0),
	(7, '2001','123', 'sandra', 'nis',"nissss020202@gmail.com","0705964724", 0, 0);
    
INSERT INTO `specialitys` (`specialityID`, `specialityName`)
VALUES
	(1, 'Vaccinering'),
	(2, 'Skada'),
	(3, 'Rehab');

INSERT INTO `bookings` (`bookingID`, `appointmentTime`, `appointmentDate`, `messageFromPatient`, `categoryID`, `doctorID`, `patientID`)
VALUES
	(1, '09:19', '22/2/2022', 'vill ta min 1a dos covid 19 vaccin', 1, 1, 4);
