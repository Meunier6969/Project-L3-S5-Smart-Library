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

-- Books
INSERT INTO Book (title, author, description, years, img) 
	VALUES ("L'art de la guerre", "Sun Tzu", "Good book", "2022-06-27", "");
INSERT INTO Book (title, author, description, years, img) 
	VALUES ("Death Note", "Tsugumi Ohba, Takeshi Obata", "Death book", "2003-12-01", "");
INSERT INTO Book (title, author, description, years, img) 
	VALUES ("Farnheit 451", "Ray Bradbury", "Book book", "1953-10-19", "");


INSERT INTO Book (title, author, description, years, img)
VALUES ("1984", "George Orwell", "Dystopian novel about totalitarianism.", "1949-06-08", "https://example.com/1984.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("To Kill a Mockingbird", "Harper Lee", "A novel about racial injustice in the Deep South.", "1960-07-11", "https://example.com/to_kill_a_mockingbird.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Great Gatsby", "F. Scott Fitzgerald", "A critique of the American Dream.", "1925-04-10", "https://example.com/the_great_gatsby.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("Brave New World", "Aldous Huxley", "A novel about a future dystopia.", "1932-08-30", "https://example.com/brave_new_world.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Catcher in the Rye", "J.D. Salinger", "A story about teenage alienation.", "1951-07-16", "https://example.com/the_catcher_in_the_rye.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("Moby Dick", "Herman Melville", "The quest for revenge against a giant whale.", "1851-10-18", "https://example.com/moby_dick.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("Pride and Prejudice", "Jane Austen", "A romantic novel about manners and marriage.", "1813-01-28", "https://example.com/pride_and_prejudice.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Hobbit", "J.R.R. Tolkien", "A fantasy novel about a hobbit's adventure.", "1937-09-21", "https://example.com/the_hobbit.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Diary of a Young Girl", "Anne Frank", "A young girl's account during the Holocaust.", "1947-06-25", "https://example.com/the_diary_of_a_young_girl.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("War and Peace", "Leo Tolstoy", "A historical novel about Napoleon's invasion of Russia.", "1869-01-01", "https://example.com/war_and_peace.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Alchemist", "Paulo Coelho", "A story about pursuing one's dreams.", "1988-04-15", "https://example.com/the_alchemist.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Picture of Dorian Gray", "Oscar Wilde", "A novel about vanity and moral duplicity.", "1890-07-01", "https://example.com/the_picture_of_dorian_gray.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Odyssey", "Homer", "An epic poem about Odysseus's journey home.", "1988-04-15", "https://example.com/the_odyssey.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("Wuthering Heights", "Emily Brontë", "A tale of love and revenge on the Yorkshire moors.", "1847-12-01", "https://example.com/wuthering_heights.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("Jane Eyre", "Charlotte Brontë", "A novel about a woman's quest for independence.", "1847-10-16", "https://example.com/jane_eyre.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Brothers Karamazov", "Fyodor Dostoevsky", "A philosophical novel about faith and doubt.", "1880-11-01", "https://example.com/the_brothers_karamazov.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("Crime and Punishment", "Fyodor Dostoevsky", "A psychological thriller about morality.", "1866-01-01", "https://example.com/crime_and_punishment.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Grapes of Wrath", "John Steinbeck", "A story of hardship during the Great Depression.", "1939-04-14", "https://example.com/the_grapes_of_wrath.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("Catch-22", "Joseph Heller", "A satirical novel about the absurdities of war.", "1961-11-10", "https://example.com/catch_22.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Road", "Cormac McCarthy", "A post-apocalyptic novel about survival.", "2006-09-26", "https://example.com/the_road.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("A Tale of Two Cities", "Charles Dickens", "A historical novel set in London and Paris.", "1859-04-30", "https://example.com/a_tale_of_two_cities.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Chronicles of Narnia", "C.S. Lewis", "A fantasy series about a magical land.", "1950-10-16", "https://example.com/the_chronicles_of_narnia.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Little Prince", "Antoine de Saint-Exupéry", "A philosophical tale about a young prince.", "1943-04-06", "https://example.com/the_little_prince.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Fault in Our Stars", "John Green", "A poignant love story between two teens with cancer.", "2012-01-10", "https://example.com/the_fault_in_our_stars.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Kite Runner", "Khaled Hosseini", "A story of friendship and redemption in Afghanistan.", "2003-05-29", "https://example.com/the_kite_runner.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Hunger Games", "Suzanne Collins", "A dystopian novel about survival in a brutal competition.", "2008-09-14", "https://example.com/the_hunger_games.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Fault in Our Stars", "John Green", "A heart-wrenching story about love and illness.", "2012-01-10", "https://example.com/the_fault_in_our_stars.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("Life of Pi", "Yann Martel", "A tale of survival and spirituality.", "2001-09-11", "https://example.com/life_of_pi.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Shining", "Stephen King", "A horror novel about a haunted hotel.", "1977-01-28", "https://example.com/the_shining.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Martian", "Andy Weir", "A science fiction novel about an astronaut stranded on Mars.", "2011-02-11", "https://example.com/the_martian.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Bell Jar", "Sylvia Plath", "A semi-autobiographical novel about a young woman's struggles.", "1963-01-14", "https://example.com/the_bell_jar.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Invisible Man", "H.G. Wells", "A science fiction novel about a scientist who becomes invisible.", "1897-01-01", "https://example.com/the_invisible_man.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("The Color Purple", "Alice Walker", "A novel about the life of African American women in the South.", "1982-02-24", "https://example.com/the_color_purple.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("A Clockwork Orange", "Anthony Burgess", "A dystopian novel about free will and morality.", "1962-01-01", "https://example.com/a_clockwork_orange.jpg");
INSERT INTO Book (title, author, description, years, img)
VALUES ("Good Omens", "Neil Gaiman, Terry Pratchett", "A comedic take on the apocalypse.", "1990-05-01", "https://example.com/good_omens.jpg");
