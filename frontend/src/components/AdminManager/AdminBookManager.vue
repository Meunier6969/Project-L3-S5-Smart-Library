<template>
  <div class="admin-books">
    <div class="action-buttons">
      <button @click="addBook" class="btn-black-white">Add a Book</button>
      <button @click="modifyBook" class="btn-black-white">Modify a Book</button>
      <button @click="deleteBook" class="btn-black-red">Delete a Book</button>
    </div>
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
      <div v-if="deleteMode || modifyMode" class="delete-form">
        <input
            v-model="searchQuery"
            :placeholder="modifyMode ? 'Search for a book to modify' : 'Search for a book to delete'"
            class="input-field"
        />
        <button @click="fetchBookToModify" class="btn-black-white">Search</button>

        <div v-if="foundBooks.length > 0" class="found-books">
          <h3>Found Books:</h3>
          <ul>
            <li v-for="foundBook in foundBooks" :key="foundBook.id">
              {{ foundBook.title }} - {{ foundBook.author }}
              <button
                  @click="deleteMode ? confirmDeleteBook(foundBook) : selectBook(foundBook)"
                  class="btn-black-red"
              >
                {{ deleteMode ? 'DELETE' : 'Select' }}
              </button>
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
      searchQuery: "",
      foundBooks: [],
      book: {
        id: null, // ID du livre ajouté ici
        title: "",
        author: "",
        years: '',
        description: "",
      },
      isAdding: false,
      deleteMode: false,
      modifyMode: false,
    };
  },
  methods: {
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
      if (Array.isArray(bookData) && bookData.length > 0) {
        this.foundBooks = bookData;
        this.isAdding = false;
        this.modifyMode = true;
        console.log("Books found:", this.foundBooks);
      } else {
        console.error("No books found with that title.");
        alert("No books found with that title.");
        this.foundBooks = [];
      }
    },

    selectBook(book) {
      if (book && book.book_id) { // Assurez-vous que l'objet book et son id existent
        this.book = { ...book }; // Copie de l'objet book
        this.isAdding = false;
        this.modifyMode = true;
        console.log("Selected book:", this.book);
      } else {
        console.error("Selected book does not have an ID.");
        alert("The selected book does not have a valid ID.");
      }
    },


    confirmModifyBook() {
      console.log("Modifying book:", this.book);
      if (!this.book.book_id) {
        console.error("Book ID is not defined.");
        alert("Please select a book to modify.");
        return;
      }

      console.log("Modifying book:", this.book);
      fetch(`http://localhost:1234/api/books/${this.book.book_id}`, {
        method: 'PATCH', // Utiliser PATCH au lieu de PUT
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
        years: this.book.years,
        description: this.book.description,
        imageURL: "https://via.placeholder.com/150", // Valeur par défaut pour l'image
        category: 1, // Catégorie par défaut
      };

      console.log("Step 1: New book object created:", newBook);

      fetch('http://localhost:1234/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to add book: ${response.statusText}`);
            }
            return response.json();
          })
          .then(data => {
            console.log("Step 4: Book added successfully:", data);
            this.resetForm();
          })
          .catch(err => {
            console.error("Step 5: Error adding book:", err.message, err.stack);
          });
    },

    modifyBook() {
      this.isAdding = false;
      this.deleteMode = false;
      this.modifyMode = true;
    },

    deleteBook() {
      this.isAdding = false;
      this.deleteMode = true;
      this.modifyMode = false;
    },

    async confirmDeleteBook(book) {
      if (!book.book_id) {
        console.error("Book ID is not defined.");
        alert("Please select a book to delete.");
        return;
      }

      const confirmed = confirm(`Are you sure you want to delete "${book.title}"?`);
      if (!confirmed) return;

      console.log("Deleting book:", book.book_id);
      fetch(`http://localhost:1234/api/books/${book.book_id}`, {
        method: 'DELETE',
      })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to delete book: ${response.statusText}`);
            }
            console.log("Book deleted successfully.");
            this.resetForm(); // Reset the form after deletion
          })
          .catch(err => {
            console.error("Error deleting book:", err.message);
          });
    },

    uploadImage(event) {
      const file = event.target.files[0];
      console.log("Uploading image:", file);
    },

    triggerUpload() {
      this.$refs.fileInput.click();
    },

    resetForm() {
      this.book = {
        id: null,
        title: "",
        author: "",
        years: "",
        description: "",
      };
      this.searchQuery = "";
      this.foundBooks = [];
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
