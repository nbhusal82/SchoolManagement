CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role enum('admin', 'teacher', 'student') not null DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  create TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    position VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    image VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       );

    create TABLE vacancy(
      id int AUTO_INCREMENT PRIMARY KEY,
      position VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      dealine VARCHAR(100) NOT Null,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )   