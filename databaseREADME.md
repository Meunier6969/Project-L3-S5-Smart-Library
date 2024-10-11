
---

# Guide to Creating the Database for the Project

This document will guide you through the steps necessary to install MySQL and create the database for this project.

## 1. Installing MySQL

### On Windows

1. Download the MySQL installer from the [official website](https://dev.mysql.com/downloads/mysql/).
2. Run the installer and follow the on-screen instructions.
3. Configure the MySQL server and set a password for the `root` user.
4. Once the installation is complete, you can use MySQL Workbench or the command line to interact with your database.

### On Linux (Debian based distribution)

1. Open a terminal.
2. Update your package list:
   ```bash
   sudo apt update
   ```
3. Install MySQL:
   ```bash
   sudo apt install mysql-server
   ```
4. Secure your MySQL installation:
   ```bash
   sudo mysql_secure_installation
   ```
5. Start the MySQL server:
   ```bash
   sudo service mysql start
   ```

### On macOS

1. Install Homebrew if you haven't already. Open a terminal and run:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Install MySQL using Homebrew:
   ```bash
   brew install mysql
   ```
3. Start the MySQL server:
   ```bash
   brew services start mysql
   ```
4. Secure your installation:
   ```bash
   mysql_secure_installation
   ```

## 2. Creating the Database

### Using MySQL Workbench

1. Open MySQL Workbench.
2. Connect to your MySQL server.
3. Click on the **"Create a new schema"** icon.
4. Enter a name for your database and click **"Apply"**.
5. Execute the SQL scripts below to create the tables and insert data:

### Using the Terminal

1. Open a terminal.
2. Connect to MySQL:
   ```bash
   mysql -u root -p
   ```
3. Create the database:
   ```sql
   CREATE DATABASE Library;
   USE Library;
   ```
4. Execute the SQL scripts to create tables and insert data:
   ```bash
   source ./backend/sql/db_base.sql;
   source ./backend/sql/db_dummydata.sql;
   ```

---
