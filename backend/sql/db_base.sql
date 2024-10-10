CREATE DATABASE IF NOT EXISTS Library;
USE Library;

-- Table des utilisateurs
CREATE TABLE Users (
   user_id INT AUTO_INCREMENT,
   pseudo VARCHAR(50),
   email VARCHAR(50),
   role BOOLEAN, 
   pwd VARCHAR(70),
   PRIMARY KEY(user_id)
);

-- Table des livres
CREATE TABLE Book (
   book_id INT AUTO_INCREMENT, 
   title VARCHAR(50),
   author VARCHAR(50),
   description TEXT,
   years DATE,
   img TEXT,
   user_id INT,
   favorites_count INT DEFAULT 0, -- Ajout d'un compteur de favoris
   search_count INT DEFAULT 0,    -- Ajout d'un compteur de recherches
   category_id INT,
   PRIMARY KEY(book_id)
);

-- Table des catégories (anciennement KeyWord)
CREATE TABLE Categories (
   id_category INT AUTO_INCREMENT,  
   category_name VARCHAR(50), 
   PRIMARY KEY(id_category)
);

-- Table des favoris
CREATE TABLE Favorites (
   user_id INT,
   book_id INT,
   PRIMARY KEY(user_id, book_id),
   FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE,  
   FOREIGN KEY(book_id) REFERENCES Book(book_id) ON DELETE CASCADE
);



-- Indexation des tables pour améliorer les performances
CREATE INDEX idx_user_id ON Favorites(user_id);
CREATE INDEX idx_book_id ON Favorites(book_id);
