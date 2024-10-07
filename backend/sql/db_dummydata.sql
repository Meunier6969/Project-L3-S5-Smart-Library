USE Library;

-- Users
INSERT INTO Users (pseudo, email, role, pwd) VALUES ('Meunier', 'meunier@efrei.net', 0, 'secure_password');
INSERT INTO Users (pseudo, email, role, pwd) VALUES ('Aloe', 'aloe@vera.com', 0, 'the_password_should');
INSERT INTO Users (pseudo, email, role, pwd) VALUES ('Obama', 'barackobama@usa.gouv', 0, 'be_hashes_im');
INSERT INTO Users (pseudo, email, role, pwd) VALUES ('Bing', 'Chilling@yeah.com', 1, 'pretty_sure');

-- Categories
INSERT INTO Categories (category_name) VALUES ('Science Fiction');
INSERT INTO Categories (category_name) VALUES ('Mystery and Thriller');
INSERT INTO Categories (category_name) VALUES ('Children''s book');
INSERT INTO Categories (category_name) VALUES ('Historical');
INSERT INTO Categories (category_name) VALUES ('Educational');

-- Books
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('L''art de la guerre', 'Sun Tzu', 'Good book', '2022-06-27', 'https://m.media-amazon.com/images/I/41YOo3BdfrL._SY445_SX342_.jpg', 4); -- Historical
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('Fahrenheit 451', 'Ray Bradbury', 'Book book', '1953-10-19', 'https://m.media-amazon.com/images/I/41mDzB8CCpL._SY445_SX342_.jpg', 1); -- Science Fiction
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('1984', 'George Orwell', 'Dystopian novel about totalitarianism.', '1949-06-08', 'https://m.media-amazon.com/images/I/41ulmGjbxTL._SY445_SX342_.jpg', 1); -- Science Fiction
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('To Kill a Mockingbird', 'Harper Lee', 'A novel about racial injustice in the Deep South.', '1960-07-11', 'https://m.media-amazon.com/images/I/61vD63WqmeL._SY425_.jpg', 4); -- Historical
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'A critique of the American Dream.', '1925-04-10', 'https://m.media-amazon.com/images/I/71mSLwEpHEL._SY425_.jpg', 4); -- Historical
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('Brave New World', 'Aldous Huxley', 'A novel about a future dystopia.', '1932-08-30', 'https://m.media-amazon.com/images/I/618C1NjkmzL._SY425_.jpg', 1); -- Science Fiction
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('The Catcher in the Rye', 'J.D. Salinger', 'A story about teenage alienation.', '1951-07-16', 'https://m.media-amazon.com/images/I/8125BDk3l9L._SL1500_.jpg', 5); -- Educational
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('Moby Dick', 'Herman Melville', 'The quest for revenge against a giant whale.', '1851-10-18', 'https://m.media-amazon.com/images/I/91EQgLKb1TL._SY425_.jpg', 4); -- Historical
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('Pride and Prejudice', 'Jane Austen', 'A romantic novel about manners and marriage.', '1813-01-28', 'https://m.media-amazon.com/images/I/412bjj40hoL._SY445_SX342_.jpg', 5); -- Educational
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('The Hobbit', 'J.R.R. Tolkien', 'A fantasy novel about a hobbit''s adventure.', '1937-09-21', 'https://m.media-amazon.com/images/I/41iWAOOaw4L._SY445_SX342_.jpg', 1); -- Science Fiction
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('The Diary of a Young Girl', 'Anne Frank', 'A young girl''s account during the Holocaust.', '1947-06-25', 'https://m.media-amazon.com/images/I/71LxcogUxpL._SY425_.jpg', 4); -- Historical
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('War and Peace', 'Leo Tolstoy', 'A historical novel about Napoleon''s invasion of Russia.', '1869-01-01', 'https://m.media-amazon.com/images/I/41VkXErPyDL._SY445_SX342_.jpg', 4); -- Historical
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('The Alchemist', 'Paulo Coelho', 'A story about pursuing one''s dreams.', '1988-04-15', 'https://m.media-amazon.com/images/I/71zHDXu1TaL._SL1500_.jpg', 5); -- Educational
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('The Picture of Dorian Gray', 'Oscar Wilde', 'A novel about vanity and moral duplicity.', '1890-07-01', 'https://m.media-amazon.com/images/I/61FdXlJX0-L._SL1200_.jpg', 5); -- Educational
INSERT INTO Book (title, author, description, years, img, category_id)
VALUES ('The Odyssey', 'Homer', 'An epic poem about Odysseus''s journey home.', '1988-04-15', 'https://m.media-amazon.com/images/I/41neMHlK5SL._SY445_SX342_.jpg', 4); -- Historical

-- Favorites
INSERT INTO Favorites (user_id, book_id) VALUES (1, 1);
INSERT INTO Favorites (user_id, book_id) VALUES (2, 2);
INSERT INTO Favorites (user_id, book_id) VALUES (3, 3);
INSERT INTO Favorites (user_id, book_id) VALUES (4, 4);
INSERT INTO Favorites (user_id, book_id) VALUES (1, 5);
INSERT INTO Favorites (user_id, book_id) VALUES (2, 6);
INSERT INTO Favorites (user_id, book_id) VALUES (3, 7);
INSERT INTO Favorites (user_id, book_id) VALUES (4, 8);
INSERT INTO Favorites (user_id, book_id) VALUES (1, 9);
INSERT INTO Favorites (user_id, book_id) VALUES (2, 10);
INSERT INTO Favorites (user_id, book_id) VALUES (3, 11);
INSERT INTO Favorites (user_id, book_id) VALUES (4, 12);
INSERT INTO Favorites (user_id, book_id) VALUES (1, 13);
INSERT INTO Favorites (user_id, book_id) VALUES (2, 14);
INSERT INTO Favorites (user_id, book_id) VALUES (3, 15);
INSERT INTO Favorites (user_id, book_id) VALUES (4, 16);
INSERT INTO Favorites (user_id, book_id) VALUES (1, 17);
INSERT INTO Favorites (user_id, book_id) VALUES (2, 18);
INSERT INTO Favorites (user_id, book_id) VALUES (3, 19);
INSERT INTO Favorites (user_id, book_id) VALUES (4, 20);
