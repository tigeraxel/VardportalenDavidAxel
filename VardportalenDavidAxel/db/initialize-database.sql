CREATE TABLE IF NOT EXISTS users(
    userID INT AUTO_INCREMENT PRIMARY KEY,
    socialSecurityNumber VARCHAR (12) NOT NULL UNIQUE,
    userPassword VARCHAR (100) NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    phoneNumber VARCHAR(30) NOT NULL,
    isDoctor BOOLEAN DEFAULT 0,
    isAdmin BOOLEAN DEFAULT 0
);

CREATE TABLE IF NOT EXISTS specialitys(
    specialityID INT AUTO_INCREMENT PRIMARY KEY,
    specialityName VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS bookings(
    bookingID INT AUTO_INCREMENT PRIMARY KEY,
    appointmentTime TIME,
    appointmentDate DATE,
    covidQuestion VARCHAR(150),
    messageFromPatient VARCHAR(350),
    categoryID INT,
    doctorID INT,
    patientID INT,
    FOREIGN KEY (categoryID) REFERENCES specialitys(specialityID),
    FOREIGN KEY (doctorID) REFERENCES users(userID),
    FOREIGN KEY (patientID) REFERENCES users(userID)
);



INSERT INTO `users` (`userID`, `socialSecurityNumber`, `userPassword`, `firstName`, `lastName`,`email`,`phoneNumber`, `isDoctor`, `isAdmin`)
VALUES
	(1, '2000','$2b$10$mlXKzXj9hhYwLFRXThPkp.ovccRhTNBdNmMzgBFZbKgl09O5SmOUS', 'axel', 'tiger',"sskdjs@gmail.com","07039374727", 1, 1);

    
INSERT INTO `specialitys` (`specialityID`, `specialityName`)
VALUES
	(1, 'Vaccinering'),
	(2, 'Skada'),
	(3, 'Rehab');

INSERT INTO `bookings` (`bookingID`, `appointmentTime`, `appointmentDate`,`covidQuestion`, `messageFromPatient`, `categoryID`, `doctorID`, `patientID`)
VALUES
	(1, '09:19:00', '2022-02-22','Ja jag har haft covid.', 'vill ta min 1a dos covid 19 vaccin!', 1, 1, 1);

