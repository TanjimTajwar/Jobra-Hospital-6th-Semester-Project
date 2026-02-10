this is my database , it is also uploaded on the sql like the same 
i have written it here again to give you an idea of my database

CREATE DATABASE jobra_hospital;
USE jobra_hospital;

CREATE TABLE jh_admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_name VARCHAR(100) NOT NULL,
    admin_email VARCHAR(100) UNIQUE NOT NULL,
    admin_password VARCHAR(100) NOT NULL,
    admin_phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jh_doctors (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    doctor_name VARCHAR(100) NOT NULL,
    doctor_email VARCHAR(100) UNIQUE NOT NULL,
    doctor_password VARCHAR(100) NOT NULL,
    doctor_phone VARCHAR(20),
    department VARCHAR(100),
    qualification VARCHAR(150),
    experience INT,
    chamber_time VARCHAR(100),
    role VARCHAR(20) DEFAULT 'doctor'
);

CREATE TABLE jh_patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_name VARCHAR(100) NOT NULL,
    patient_email VARCHAR(100) UNIQUE NOT NULL,
    patient_password VARCHAR(100) NOT NULL,
    patient_phone VARCHAR(20),
    age INT,
    gender VARCHAR(10),
    blood_group VARCHAR(10),
    address TEXT,
    role VARCHAR(20) DEFAULT 'patient'
);

CREATE TABLE jh_appointments (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    doctor_id INT,
    patient_id INT,
    appointment_date DATE,
    appointment_time VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',

    FOREIGN KEY (doctor_id) REFERENCES jh_doctors(doctor_id)
        ON DELETE CASCADE,

    FOREIGN KEY (patient_id) REFERENCES jh_patients(patient_id)
        ON DELETE CASCADE
);

CREATE TABLE jh_reports (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    doctor_id INT,
    patient_id INT,
    diagnosis TEXT,
    prescription TEXT,
    medical_test TEXT,
    advice TEXT,
    report_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (doctor_id) REFERENCES jh_doctors(doctor_id)
        ON DELETE CASCADE,

    FOREIGN KEY (patient_id) REFERENCES jh_patients(patient_id)
        ON DELETE CASCADE
);

CREATE TABLE jh_complaints (
    complaint_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT NULL,
    message TEXT NOT NULL,
    complaint_type VARCHAR(20),
    complaint_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'unread',

    FOREIGN KEY (patient_id) REFERENCES jh_patients(patient_id)
        ON DELETE CASCADE,

    FOREIGN KEY (doctor_id) REFERENCES jh_doctors(doctor_id)
        ON DELETE CASCADE
);

CREATE TABLE jh_logins (
    login_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20),
    ref_id INT
);