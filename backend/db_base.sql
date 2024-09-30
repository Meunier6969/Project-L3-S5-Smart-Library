CREATE DATABASE Library;
USE Library;

-- Table des utilisateurs
CREATE TABLE Users (
   user_id INT AUTO_INCREMENT,
   pseudo VARCHAR(50),
   email VARCHAR(50),
   role BOOLEAN, 
   pwd VARCHAR(50),
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
   favorites_count INT DEFAULT 0, -- Ajout d'un compteur de favoris
   search_count INT DEFAULT 0,    -- Ajout d'un compteur de recherches
   PRIMARY KEY(book_id)
);

-- Table des catégories (anciennement KeyWord)
CREATE TABLE Categories (
   id_category INT AUTO_INCREMENT,  
   category_name VARCHAR(50), 
   PRIMARY KEY(id_category)
);

-- Table des favoris
CREATE TABLE Favoris (
   user_id INT,
   book_id INT,
   PRIMARY KEY(user_id, book_id),
   FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE,  
   FOREIGN KEY(book_id) REFERENCES Book(book_id) ON DELETE CASCADE
);

-- Table pour lier les livres aux catégories
CREATE TABLE Book_Categories (
   book_id INT,
   id_category INT,
   PRIMARY KEY(book_id, id_category),
   FOREIGN KEY(book_id) REFERENCES Book(book_id) ON DELETE CASCADE,
   FOREIGN KEY(id_category) REFERENCES Categories(id_category) ON DELETE CASCADE
);

-- Indexation des tables pour améliorer les performances
CREATE INDEX idx_user_id ON Favoris(user_id);
CREATE INDEX idx_book_id ON Favoris(book_id);
CREATE INDEX idx_book_categories_book_id ON Book_Categories(book_id);
CREATE INDEX idx_book_categories_id_category ON Book_Categories(id_category);