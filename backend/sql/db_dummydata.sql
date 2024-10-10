USE Library;

-- User
INSERT INTO Users (pseudo, email, role, pwd) VALUES ('Meunier', 'meunier@efrei.net', 0, 'ff2f12ec5c6a2e9ef6b61c958ed701c327469190a18075fd909ec2a9b42b94f2'); -- secure_password
INSERT INTO Users (pseudo, email, role, pwd) VALUES ('Aloe', 'aloe@vera.com', 0, '7de1980b3d7c810a80f9b61e950a3e2d959510434b09cebab58a6644e31414b7'); -- the_password_should
INSERT INTO Users (pseudo, email, role, pwd) VALUES ('Obama', 'barackobama@usa.gouv', 0, 'a4849eec660620f498180134b28cb99116d15696894de2b90f2b3eb2535e2fc3'); -- be_hashes_im
INSERT INTO Users (pseudo, email, role, pwd) VALUES ('Bing', 'Chilling@yeah.com', 1, '7539c8a1f0a267b20a2d079a9c29b3b03a791f197f32b55918c5c81fecbbd038'); -- prety_secure

-- Categories
INSERT INTO Categories (category_name) VALUES ('Science Fiction');
INSERT INTO Categories (category_name) VALUES ('Mystery and Thriller');
INSERT INTO Categories (category_name) VALUES ('Children''s book');
INSERT INTO Categories (category_name) VALUES ('Historical');
INSERT INTO Categories (category_name) VALUES ('Educational');

-- Books
INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('L''art de la guerre', 'Sun Tzu', 'Sun Tzu''s "The Art of War" outlines strategic principles and tactics for success in battle. It''s not just about warfare; it’s a guide to mastering conflict in all aspects of life. The Art of War demonstrates how reflection can lead to victory, how analyzing the enemy''s weaknesses can form the basis of a tactic if one knows how to exploit and even worsen them. It also emphasizes the psychological dimension of combat, the role of cunning and retreat. The thirteen chapters of the work philosophically and sociologically explore various techniques and approaches to overcome enemies while minimizing losses—whether financial, material, or human. The idea is to compel the enemy to abandon the fight.', '2022-06-27', 'https://m.media-amazon.com/images/I/41YOo3BdfrL._SY445_SX342_.jpg', 240000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('Fahrenheit 451', 'Ray Bradbury', 'In a future society where books are outlawed, firemen don''t extinguish fires; they start them. Guy Montag, a fireman, lives in a world where books are banned, and intellectual thought is under siege. His job is to burn books, but he begins to question the very laws that define his existence. "Fahrenheit 451" explores the consequences of a society where knowledge is suppressed, and conformity reigns supreme. It is a powerful warning against the dangers of censorship and the loss of individual thought.', '1953-10-19', 'https://m.media-amazon.com/images/I/41mDzB8CCpL._SY445_SX342_.jpg', 450000, 1);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('1984', 'George Orwell', 'George Orwell''s "1984" paints a bleak portrait of a dystopian future dominated by totalitarian control. The protagonist, Winston Smith, lives under the eye of Big Brother, where the Party controls not only the citizens'' actions but also their thoughts. Through Winston''s journey of rebellion, the novel explores the terrifying mechanisms of oppression, surveillance, and propaganda. "1984" is a chilling reminder of the fragility of freedom and the terrifying power of government control when left unchecked.', '1949-06-08', 'https://m.media-amazon.com/images/I/41ulmGjbxTL._SY445_SX342_.jpg', 680000, 1);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('To Kill a Mockingbird', 'Harper Lee', '"To Kill a Mockingbird" is a powerful exploration of racial injustice in the American South. Through the eyes of young Scout Finch, the reader witnesses the moral struggles of her father, Atticus Finch, as he defends a black man falsely accused of raping a white woman. Set in the 1930s, the novel confronts deeply rooted prejudices, the importance of standing up for what''s right, and the complexities of human morality. It remains a poignant reminder of the consequences of inequality and racism.', '1960-07-11', 'https://m.media-amazon.com/images/I/61vD63WqmeL._SY425_.jpg', 390000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'F. Scott Fitzgerald''s "The Great Gatsby" is a critique of the American Dream, following the mysterious Jay Gatsby and his obsessive love for Daisy Buchanan. Set in the Roaring Twenties, it depicts the glitz and glamour of high society alongside the moral decay lurking beneath. The novel explores themes of love, wealth, and ambition, and questions whether the pursuit of material success can truly bring happiness. A timeless reflection on dreams, desire, and disillusionment.', '1925-04-10', 'https://m.media-amazon.com/images/I/71mSLwEpHEL._SY425_.jpg', 500000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('Brave New World', 'Aldous Huxley', '"Brave New World" presents a nightmarish vision of a future society where people are controlled through pleasure, conditioning, and mindless consumerism. In this society, humans are genetically engineered and conditioned for specific roles, while emotions, individuality, and critical thought are suppressed. Aldous Huxley''s dystopia is a chilling warning against the potential consequences of technological advancement and societal control, asking readers to consider what true freedom means.', '1932-08-30', 'https://m.media-amazon.com/images/I/618C1NjkmzL._SY425_.jpg', 470000, 1);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Catcher in the Rye', 'J.D. Salinger', '"The Catcher in the Rye" follows the teenage protagonist, Holden Caulfield, as he grapples with feelings of alienation, loss, and the superficiality of the adult world. Written in a deeply personal, confessional style, the novel captures Holden''s angst as he wanders New York City searching for meaning in a world he feels disconnected from. It is a powerful exploration of adolescent rebellion and the yearning to preserve innocence in an unforgiving world.', '1951-07-16', 'https://m.media-amazon.com/images/I/8125BDk3l9L._SL1500_.jpg', 520000, 5);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('Moby Dick', 'Herman Melville', '"Moby Dick" is an epic tale of Captain Ahab''s obsessive quest for revenge against the white whale, Moby Dick, that cost him his leg. Narrated by Ishmael, the novel delves into themes of obsession, revenge, and man''s struggle against nature. It''s a thrilling adventure on the high seas, rich with symbolism, as it explores the limits of human ambition and the dangers of unchecked vengeance.', '1851-10-18', 'https://m.media-amazon.com/images/I/91EQgLKb1TL._SY425_.jpg', 320000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('Pride and Prejudice', 'Jane Austen', '"Pride and Prejudice" is a romantic novel that follows the headstrong Elizabeth Bennet as she navigates social expectations, family pressures, and her tumultuous relationship with the wealthy but aloof Mr. Darcy. Through wit and humor, Jane Austen explores themes of love, class, and individual growth in Regency-era England, offering a timeless commentary on human relationships and societal norms.', '1813-01-28', 'https://m.media-amazon.com/images/I/412bjj40hoL._SY445_SX342_.jpg', 480000, 5);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Hobbit', 'J.R.R. Tolkien', '"The Hobbit" is a classic fantasy tale that follows the unlikely hero, Bilbo Baggins, as he embarks on an epic adventure to reclaim a treasure guarded by a fearsome dragon. Along the way, Bilbo encounters elves, goblins, and a strange creature named Gollum, as he discovers bravery and cunning he never knew he had. Tolkien''s richly detailed world and memorable characters make this a timeless story of courage, friendship, and self-discovery.', '1937-09-21', 'https://m.media-amazon.com/images/I/41iWAOOaw4L._SY445_SX342_.jpg', 620000, 1);
INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Diary of a Young Girl', 'Anne Frank', 'The "Diary of a Young Girl" is the personal account of Anne Frank, a Jewish girl hiding from the Nazis during World War II. Her diary provides a poignant and intimate glimpse into the struggles of a family living in constant fear, while also showcasing Anne''s remarkable courage, optimism, and wisdom. The diary has become a powerful testament to the horrors of war and the resilience of the human spirit.', '1947-06-25', 'https://m.media-amazon.com/images/I/71LxcogUxpL._SY425_.jpg', 410000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('War and Peace', 'Leo Tolstoy', '"War and Peace" is an epic historical novel set during Napoleon''s invasion of Russia. It follows the lives of several aristocratic families, offering a sweeping exploration of love, honor, and the brutality of war. Tolstoy masterfully intertwines the personal and the political, capturing both the grand scale of history and the intimate struggles of individuals. It remains one of the greatest works of literature.', '1869-01-01', 'https://m.media-amazon.com/images/I/41VkXErPyDL._SY445_SX342_.jpg', 330000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Alchemist', 'Paulo Coelho', '"The Alchemist" tells the mystical story of Santiago, a shepherd boy on a journey to discover a treasure hidden near the Egyptian pyramids. Along the way, Santiago learns profound lessons about following his dreams, listening to his heart, and recognizing life''s subtle signs. The novel is a spiritual and philosophical reflection on the pursuit of personal legend and the importance of living with purpose.', '1988-04-15', 'https://m.media-amazon.com/images/I/71zHDXu1TaL._SL1500_.jpg', 570000, 5);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Picture of Dorian Gray', 'Oscar Wilde', '"The Picture of Dorian Gray" explores the corrupting influence of vanity and the pursuit of eternal youth. Dorian Gray, a handsome young man, makes a Faustian bargain where his portrait ages while he remains young. As Dorian indulges in every vice and pleasure, his soul darkens, reflected in his increasingly grotesque portrait. Wilde''s only novel is a dark tale of moral consequences and the dangers of living without restraint.', '1890-07-01', 'https://m.media-amazon.com/images/I/61FdXlJX0-L._SL1200_.jpg', 440000, 5);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Odyssey', 'Homer', 'Homer''s "The Odyssey" is one of the great epic poems of ancient Greece. It recounts the adventures of Odysseus as he struggles to return home after the Trojan War, facing mythical creatures, gods, and numerous challenges. The poem is a timeless exploration of bravery, cunning, and the power of perseverance, while also providing a deep reflection on the human condition and the longing for home.', '1988-04-15', 'https://m.media-amazon.com/images/I/41neMHlK5SL._SY445_SX342_.jpg', 380000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('Wuthering Heights', 'Emily Bronte', '"Wuthering Heights" is a haunting tale of love and revenge set on the wild Yorkshire moors. The novel follows the intense and destructive relationship between Heathcliff and Catherine Earnshaw, and the devastating impact their love has on those around them. Brontë''s gothic masterpiece is a dark exploration of passion, obsession, and the darker sides of human nature.', '1847-12-01', 'https://m.media-amazon.com/images/I/81T34Sem-tL._SY425_.jpg', 430000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Brothers Karamazov', 'Fyodor Dostoevsky', '"The Brothers Karamazov" is a philosophical novel that examines the moral, religious, and existential dilemmas of humanity. It tells the story of the Karamazov family, particularly the strained relationships between a father and his three sons. Dostoevsky delves into themes of faith, free will, and morality, offering readers a profound reflection on the nature of good and evil.', '1880-11-01', 'https://m.media-amazon.com/images/I/41pnRR1QyiL._SY445_SX342_.jpg', 390000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('Crime and Punishment', 'Fyodor Dostoevsky', '"Crime and Punishment" is a psychological thriller that follows Raskolnikov, a destitute former student who believes he can commit the perfect crime and murder a corrupt pawnbroker for the greater good. After the act, he is consumed by guilt and paranoia, leading him into a cat-and-mouse game with a shrewd detective. Dostoevsky''s exploration of guilt, justice, and redemption makes this a gripping and thought-provoking read.', '1866-01-01', 'https://m.media-amazon.com/images/I/31sAHo1LBNL._SY445_SX342_.jpg', 370000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Grapes of Wrath', 'John Steinbeck', '"The Grapes of Wrath" tells the story of the Joad family, who are forced off their land during the Great Depression and embark on a harrowing journey to California in search of a better life. Steinbeck''s novel is a powerful depiction of human suffering and resilience in the face of social injustice, capturing the desperation and hope of the American migrant experience.', '1939-04-14', 'https://m.media-amazon.com/images/I/41y80FPyxdL._SY445_SX342_.jpg', 340000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('Catch-22', 'Joseph Heller', '"Catch-22" is a satirical novel that explores the absurdities of war through the experiences of Captain John Yossarian, a bomber pilot during World War II. Heller invents the concept of the "catch-22," a no-win situation where attempting to escape a perilous situation makes it worse. The novel is a biting critique of military bureaucracy and the madness of war, filled with dark humor and wit.', '1961-11-10', 'https://m.media-amazon.com/images/I/51CanUIp3AL._SY445_SX342_.jpg', 290000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Road', 'Cormac McCarthy', '"The Road" is a haunting post-apocalyptic novel that follows a father and son as they journey through a desolate, ash-covered landscape, struggling to survive. Their bond is the emotional heart of the story as they navigate the dangers of a world stripped of civilization. McCarthy''s sparse, poetic prose heightens the novel''s bleakness, creating a powerful meditation on survival, love, and hope.', '2006-09-26', 'https://m.media-amazon.com/images/I/41GuWgTvzoL._SY445_SX342_.jpg', 320000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('A Tale of Two Cities', 'Charles Dickens', '"A Tale of Two Cities" is a historical novel set during the tumultuous period of the French Revolution. It contrasts life in London and Paris and follows the intertwined fates of characters like Charles Darnay, a French aristocrat, and Sydney Carton, a disillusioned English lawyer. Dickens masterfully weaves together themes of sacrifice, love, and redemption, capturing the horror and heroism of the era.', '1859-04-30', 'https://m.media-amazon.com/images/I/51c1YukxNQL._SY445_SX342_.jpg', 390000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Chronicles of Narnia', 'C.S. Lewis', '"The Chronicles of Narnia" is a beloved fantasy series that transports readers to the magical world of Narnia, where animals talk, children become kings and queens, and good battles evil. The first book, "The Lion, the Witch, and the Wardrobe," follows four siblings as they discover Narnia through a wardrobe and help Aslan, the great lion, defeat the evil White Witch. Full of adventure, imagination, and moral lessons, this series is a timeless favorite for readers of all ages.', '1950-10-16', 'https://m.media-amazon.com/images/I/51Uq3ORSmQL._SY445_SX342_.jpg', 500000, 1);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Little Prince', 'Antoine de Saint-Exupéry', '"The Little Prince" is a philosophical tale about a young prince who leaves his tiny planet to explore the universe, encountering strange adults and learning profound lessons along the way. The story explores themes of love, loss, and the importance of seeing with the heart, not just the eyes. Saint-Exupéry''s timeless tale reminds readers of the wonder of childhood and the importance of imagination and human connection.', '1943-04-06', 'https://m.media-amazon.com/images/I/51hdXgVAgoL._SY445_SX342_.jpg', 610000, 5);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Fault in Our Stars', 'John Green', '"The Fault in Our Stars" is a poignant love story between two teenagers, Hazel and Augustus, who meet at a cancer support group. Despite their terminal illnesses, they form a deep bond as they navigate the complexities of life, love, and mortality. John Green crafts a heartfelt exploration of life''s unpredictability and the beauty of human connections, even in the face of tragedy.', '2012-01-10', 'https://m.media-amazon.com/images/I/61fbVx3W5cL._SY342_.jpg', 460000, 5);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Kite Runner', 'Khaled Hosseini', '"The Kite Runner" is a powerful story of friendship, betrayal, and redemption set in Afghanistan. The novel follows Amir, a privileged boy, and Hassan, his loyal friend and servant, as they grow up together. A traumatic event changes their relationship forever, and Amir spends much of his life seeking to atone for his past mistakes. Hosseini''s debut novel is a moving exploration of guilt, forgiveness, and the complexities of human relationships.', '2003-05-29', 'https://m.media-amazon.com/images/I/51urz6CWBdL._SY445_SX342_.jpg', 520000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Hunger Games', 'Suzanne Collins', '"The Hunger Games" is a dystopian novel set in a future where a totalitarian government forces children from different districts to compete in a televised fight to the death. Katniss Everdeen volunteers to take her sister''s place in the deadly Hunger Games, where she must rely on her wits and survival skills to make it out alive. Collins''s fast-paced, thrilling story explores themes of survival, sacrifice, and resistance against tyranny.', '2008-09-14', 'https://m.media-amazon.com/images/I/41I0GHe7MdL._SY445_SX342_.jpg', 610000, 1);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('Life of Pi', 'Yann Martel', '"Life of Pi" is the extraordinary tale of Pi Patel, a young boy stranded in the Pacific Ocean on a lifeboat with a Bengal tiger after a shipwreck. The novel explores Pi''s spiritual journey as he struggles to survive against overwhelming odds. Yann Martel blends adventure with deep philosophical questions, offering readers a reflection on faith, the nature of truth, and the will to survive.', '2001-09-11', 'https://m.media-amazon.com/images/I/61VSOABBRjL._SY466_.jpg', 430000, 5);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Shining', 'Stephen King', '"The Shining" is a psychological horror novel that follows Jack Torrance, a writer who takes a job as a winter caretaker at the isolated Overlook Hotel. As the hotel''s malevolent influence begins to take hold, Jack descends into madness, putting his family in grave danger. King''s novel is a terrifying exploration of fear, isolation, and the darkness that lurks within us all.', '1977-01-28', 'https://m.media-amazon.com/images/I/81CuEX3W9UL._SY466_.jpg', 370000, 2);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Color Purple', 'Alice Walker', '"The Color Purple" is a powerful story about African American women in the early 20th-century South. The novel follows Celie, a young black woman who faces abuse, poverty, and oppression, yet finds hope and healing through letters she writes to God and her relationship with the strong women around her. Walker''s poignant exploration of race, gender, and spirituality earned her a Pulitzer Prize and continues to resonate with readers today.', '1982-02-01', 'https://m.media-amazon.com/images/I/41W4rzIn1UL._SY445_SX342_.jpg', 450000, 4);

INSERT INTO Book (title, author, description, years, img, search_count, category_id)
VALUES ('The Perks of Being a Wallflower', 'Stephen Chbosky', '"The Perks of Being a Wallflower" is a coming-of-age novel told through the letters of Charlie, a shy and introspective teenager who struggles to find his place in high school. As he befriends a group of misfit seniors, Charlie navigates the highs and lows of adolescence, from first love to deep emotional trauma. Chbosky''s novel is a heartfelt exploration of growing up, self-discovery, and the importance of connection.', '1999-09-01', 'https://m.media-amazon.com/images/I/51kAQABtC1L._SY445_SX342_.jpg', 490000, 5);-- Favorites
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
