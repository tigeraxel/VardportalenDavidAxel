CREATE TABLE IF NOT EXISTS users(
    userID INT AUTO_INCREMENT PRIMARY KEY,
    socialSecurityNumber TEXT NOT NULL UNIQUE,
    userPassword TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    isDoctor BOOLEAN DEFAULT 0,
    isAdmin BOOLEAN DEFAULT 0
);

CREATE TABLE IF NOT EXISTS specialitys(
    specialityID INT AUTO_INCREMENT PRIMARY KEY,
    specialityName TEXT
);

CREATE TABLE IF NOT EXISTS bookings(
    bookingID INT AUTO_INCREMENT PRIMARY KEY,
    appointmentTime TIME,
    appointmentDate DATE,
    covidQuestion TEXT,
    messageFromPatient TEXT,
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

