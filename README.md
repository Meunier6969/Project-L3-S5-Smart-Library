
---

# 📚 Smart Library
![Capture d’écran du 2024-10-10 15-16-57.png](img/Capture%20d%E2%80%99%C3%A9cran%20du%202024-10-10%2015-16-57.png)
---

### Full-Stack Library Management System

---

## 👥 Contributors

- [<img src="https://github.com/Meunier6969.png" width="40" height="40" style="border-radius: 50%;" alt="Meunier A." /> Meunier A.](https://github.com/Meunier6969)
- [<img src="https://github.com/Corentin-k.png" width="40" height="40" style="border-radius: 50%;" alt="Corentin_k_" /> Corentin_k_](https://github.com/Corentin-k)
- [<img src="https://github.com/benjidsv.png" width="40" height="40" style="border-radius: 50%;" alt="Benjamin Arbousset" /> Benjamin Arbousset](https://github.com/benjidsv)
- [<img src="https://github.com/MailinhTA.png" width="40" height="40" style="border-radius: 50%;" alt="Mailinh" /> Mailinh](https://github.com/MailinhTA)
- [<img src="https://github.com/lolo2109.png" width="40" height="40" style="border-radius: 50%;" alt="Lolo2109" /> Lolo2109](https://github.com/lolo2109)

---

## 📖 Overview

**Smart Library** is an online bookstore designed for users to explore and manage their favorite books while allowing administrators to effectively oversee the book inventory. Key features include user registration, book browsing, and administrative functionalities. The inventory encompasses five genres:

- Science Fiction
- Mystery & Thriller
- Children’s Books
- Historical
- Educational

An optional AI-driven book recommendation system is integrated to enhance user experience.

---

## ✨ Features

### Core Features

- **User Account Management**
    - Account registration, login, profile management, and favorites management.
    - Client- and server-side validation for data accuracy and security.
    - Add and remove books from a favorites list.

- **Book Listing**
    - Display books categorized into the five genres mentioned above.

- **Search and Browse**
    - Search for books by title, author, or category.

### Admin Features (Not Displayed to Users)

- **Inventory Management**
    - Administrators can add, modify, and delete books from the system.

- **Advanced Admin Mode**
    - Access to detailed statistics on user interactions, including book popularity.

- **User Interaction Tracking**
    - An invisible dashboard enabling administrators to monitor user interactions (e.g., most viewed books, frequent searches).

- **Backend Performance Optimization**
    - Algorithms designed to balance server load and ensure fast site performance under high traffic.

### Optional Features

- **AI Recommendation System**
    - Personalized recommendations based on user preferences.

### Possible Additional Features (If Time Permits)

- **Book Reviews and Ratings**
    - Functionality for users to leave comments and ratings on books.

- **Mobile Optimization**
    - Responsive user interface across all device types.

- **Error Monitoring and Reporting System**
    - An internal tool to detect and log site errors or crashes in real-time, sending alerts to developers/admins.

---

## 🛠️ Tech Stack

- **Front-End**
    - Vue.js
    - Vite.js
    - JavaScript

- **Back-End**
    - Node.js
    - MySQL

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** and **npm** installed
- **MySQL** installed and running

### Installation

#### Clone the Repository

```bash
git clone https://github.com/Meunier6969/Project-L3-S5-Smart-Library.git
```

#### Front-End Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd Project-L3-S5-Smart-Library/frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:
    - Rename `.envexample` to `.env`.
    - Add your own information (the OpenAI API key if you want to use the chatbox).

4. Run the front-end development server:

   ```bash
   npm run dev
   ```

#### Back-End Setup

1. Navigate to the `backend` directory:

   ```bash
   cd ../backend
   ```

2. Create a `.env` file:
    - Rename `.envexample` to `.env`.
    - Fill in the necessary information.

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the back-end server:

   ```bash
   npm start
   ```

---

### 🗄️ Database Setup

For detailed instructions on setting up the database, please refer to the [databaseREADME.md](./databaseREADME.md) file.


---

## 📷 Screenshots

The main page:
![Capture d’écran du 2024-10-10 15-16-57.png](img/Capture%20d%E2%80%99%C3%A9cran%20du%202024-10-10%2015-16-57.png)

PopUp Book:
![Capture d’écran du 2024-10-10 15-18-33.png](img/Capture%20d%E2%80%99%C3%A9cran%20du%202024-10-10%2015-18-33.png)

Favorite Books :
![Capture d’écran du 2024-10-10 15-20-10.png](img/Capture%20d%E2%80%99%C3%A9cran%20du%202024-10-10%2015-20-10.png)

Chat Box:
![Capture d’écran du 2024-10-10 15-17-52.png](img/Capture%20d%E2%80%99%C3%A9cran%20du%202024-10-10%2015-17-52.png)

Admin view:
![Capture d’écran du 2024-10-10 15-20-33.png](img/Capture%20d%E2%80%99%C3%A9cran%20du%202024-10-10%2015-20-33.png)

---
