<template>
  <div class="admin-books">
    <!-- Left Column: Action Buttons -->
    <div class="action-buttons">
      <button @click="addBook" class="btn-black-white">Add a Book</button>
      <button @click="modifyBook" class="btn-black-white">Modify a Book</button>
      <button @click="deleteBook" class="btn-black-red">Delete a Book</button>
    </div>
    <!-- Book Form for Adding or Modifying a Book -->
    <div style="grid-column: 2;">
      <h2>Book Manager</h2>
    <div v-if="!deleteMode && (isAdding || modifyMode)" class="book-form">
      <div class="upload-zone" @click="triggerUpload">
        <input type="file" ref="fileInput" @change="uploadImage" hidden />
        <div class="upload-content">
          <i class="upload-icon">⇧</i>
          <p><em>Drop your image here</em></p>
        </div>
      </div>
      <div class="book-details">
        <input
            v-model="book.title"
            :placeholder="isAdding ? 'Add Title' : 'Edit Title'"
            class="input-field"
        />
        <input
            v-model="book.author"
            :placeholder="isAdding ? 'Add Author' : 'Edit Author'"
            class="input-field"
        />
        <input
            v-model="book.years"
            :placeholder="isAdding ? 'Add publishing date' : 'Edit publishing date'"
            class="input-field"
        />
        <textarea
            v-model="book.description"
            :placeholder="isAdding ? 'Add Description' : 'Edit Description'"
            class="textarea-field"
        ></textarea>
        <button
            @click="isAdding ? confirmAddBook() : confirmModifyBook()"
            class="btn-black-white"
        >
          {{ isAdding ? "ADD" : "MODIFY" }}
        </button>
      </div>
    </div>
    <!-- Right Column: Book Modification Form -->
    <div v-if="deleteMode || modifyMode" class="delete-form">
      <input
          v-model="searchQuery"
          :placeholder="modifyMode ? 'Search for a book to modify' : 'Search for a book to delete'"
          class="input-field"
      />
      <button @click="fetchBookToModify" class="btn-black-white">Search</button>

      <div v-if="modifyMode && foundBooks.length > 0" class="found-books">
        <h3>Found Books:</h3>
        <ul>
          <li v-for="foundBook in foundBooks" :key="foundBook.id">
            {{ foundBook.title }} - {{ foundBook.author }}
            <button @click="selectBook(foundBook)">Select</button>
          </li>
        </ul>
      </div>
    </div>
    </div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      searchQuery: "", // For the search functionality
      foundBooks: [], // For storing found books
      book: {
        title: "Fondation",
        author: "Isaac Asimov",
        years: 1968,
        description: "For twelve thousand years the Galactic Empire has ruled supreme...",
      },
      isAdding: false, // Tracks if we're in "add" mode
      deleteMode: false, // Tracks if we're in "delete" mode
      modifyMode: false, // Tracks if we're in "modify" mode
    };
  },
  methods: {
    // Function to handle book modification
    async fetchBookToModify() {
      if (this.searchQuery.length < 3) {
        console.error("Search query must be at least 3 characters long.");
        return;
      }

      console.log("Searching for books containing:", this.searchQuery);
      const response = await fetch(`http://localhost:1234/api/books/search/${encodeURIComponent(this.searchQuery)}`);

      if (!response.ok) {
        console.error("Failed to fetch books:", response.statusText);
        return;
      }

      const bookData = await response.json();

      // Check if any books were found
      if (Array.isArray(bookData) && bookData.length > 0) {
        this.foundBooks = bookData; // Store all found books
        this.isAdding = false;
        this.modifyMode = true;
        console.log("Books found:", this.foundBooks);
      } else {
        console.error("No books found with that title.");
        alert("No books found with that title.");
        this.foundBooks = []; // Reset list if no books are found
      }
    },

    // Function to handle selecting a book
    selectBook(book) {
      this.book = book; // Update selected book
      this.isAdding = false;
      this.modifyMode = true;
      console.log("Selected book:", this.book);
    },

    confirmModifyBook() {
      console.log("Modifying book:", this.book);
      // Add fetch request to update book in the database
      fetch(`http://localhost:1234/api/books/${this.book.id}`, {
        method: 'PUT', // Assuming you want to update the book
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.book),
      })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to modify book: ${response.statusText}`);
            }
            return response.json();
          })
          .then(data => {
            console.log("Book modified successfully:", data);
            this.resetForm(); // Reset form after modification
          })
          .catch(err => {
            console.error("Error modifying book:", err.message);
          });
    },

    // Function to handle adding a book
    // Switch to add mode
    addBook() {
      this.isAdding = true;
      this.deleteMode = false;
      this.modifyMode = false;
      this.resetForm();
    },
    confirmAddBook() {
      const newBook = {
        title: this.book.title,
        author: this.book.author,
        year: this.book.year,
        description: this.book.description,
        imageURL: "https://via.placeholder.com/150", // Default value for the image
        category: 1, // Default category (to adjust if necessary)
      };

      console.log("Step 1: New book object created:", newBook); // Check data before sending

      // Log before fetch request
      console.log("Step 2: Sending fetch request...");

      fetch('http://localhost:1234/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure the server knows it's JSON
        },
        body: JSON.stringify(newBook),
      })
          .then(response => {
            // Log the response
            console.log("Step 3: Received response:", response);

            if (!response.ok) {
              throw new Error(`Failed to add book: ${response.statusText}`);
            }
            return response.json();
          })
          .then(data => {
            // Log success
            console.log("Step 4: Book added successfully:", data);
            this.resetForm(); // Reset form after successful addition
          })
          .catch(err => {
            // Log detailed error
            console.error("Step 5: Error adding book:", err.message, err.stack);
          });
    },

    // Switch to modify mode
    modifyBook() {
      this.isAdding = false;
      this.deleteMode = false;
      this.modifyMode = true;
    },
    // Switch to delete mode
    deleteBook() {
      this.isAdding = false;
      this.deleteMode = true;
      this.modifyMode = false;
    },
    // Handle image upload
    uploadImage(event) {
      const file = event.target.files[0];
      console.log("Uploading image:", file);
    },
    // Trigger file input click
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    // Reset the form when adding a book
    resetForm() {
      this.book = {
        title: "",
        author: "",
        year: "",
        description: "",
      };
      this.searchQuery = ""; // Reset search query
      this.foundBooks = []; // Reset found books
    },
  },
};
</script>

<style scoped>
.book-details {
  flex-basis: 100%;
  max-width: 420px;

  width: 100%;
}

.admin-books {
  display: grid;
  grid-template-columns: 1fr 2fr;

  background-color: #f5f5f5;
  height: auto;
  padding: 50px;

}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;

  flex-basis: 100%;
  max-width: 300px;
  min-width: 20px;

  justify-content: center;
}

.action-buttons button {
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.btn-black-white {
  background-color: black;
  color: white;
  border: 1px solid black;
}

.btn-black-white:hover {
  background-color: white;
  color: black;
}

.btn-black-red {
  background-color: black;
  color: red;
  border: 1px solid black;
}

.btn-black-red:hover {
  background-color: red;
  color: white;
}
.book-form {
  display: flex;
  flex-direction: row;
  gap: 30px;
}
.upload-zone {
  width: 250px;
  height: 250px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  flex-direction: column;
  transition: background-color 0.3s ease;
}

.upload-zone:hover {
  background-color: #d0d0d0;
}

.upload-icon {
  font-size: 24px;
}

.upload-content p {
  margin-top: 10px;
  font-size: 14px;
  font-style: italic;
  color: #666;
}


.found-books {
  margin-top: 20px; /* Espace au-dessus des résultats */
  max-height: 200px; /* Limiter la hauteur du conteneur */
  overflow-y: auto; /* Permet le défilement si le contenu déborde */
  border: 1px solid #ced4da; /* Pour délimiter visuellement le conteneur */
  padding: 10px; /* Un peu de remplissage pour les résultats */
  background-color: white; /* Fond pour le conteneur */
}
.found-books h3 {
  margin-bottom: 10px;
}

.found-books ul {
  list-style-type: none;
  padding: 0;
}

.found-books li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.delete-form {
  display: flex;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
  gap: 10px;
}

.input-field,
.textarea-field {
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
}
.textarea-field {
   resize: none;
   height: 100px;
 }





</style>
