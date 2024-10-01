USE Library;

-- Users
INSERT INTO Users (pseudo, email, role, pwd) VALUES ('Meunier', 'meunier@efrei.net', 0, 'secure_password');
INSERT INTO Users (pseudo, email, role, pwd) VALUES ('Aloe', 'aloe@vera.com', 0, 'the_password_should');
INSERT INTO Users (pseudo, email, role, pwd) VALUES ('Obama', 'barackobama@usa.gouv', 0, 'be_hashes_im');
INSERT INTO Users (pseudo, email, role, pwd) VALUES ('Bing', 'Chilling@yeah.com', 1, 'pretty_sure');

-- Categories
INSERT INTO Categories (category_name) VALUES ('Science Fiction');
INSERT INTO Categories (category_name) VALUES ('Mystery and Thriller');
INSERT INTO Categories (category_name) VALUES ("Children's book");
INSERT INTO Categories (category_name) VALUES ('Historical');
INSERT INTO Categories (category_name) VALUES ('Educational');

-- 
