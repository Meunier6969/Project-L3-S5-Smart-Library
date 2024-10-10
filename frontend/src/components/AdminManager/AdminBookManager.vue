<template>
  <div id="booksManager" class="container-fluid mt-3">
    <div class="admin-books col p-3">
      <!-- Left Column: Action Buttons -->
      <div class="action-buttons">
        <button
            @click="selectButton('add')"
            :class="getButtonClass('add')"
            class="btn-black-white"
        >
          Add a Book
        </button>
        <button
            @click="selectButton('modify')"
            :class="getButtonClass('modify')"
            class="btn-black-white"
        >
          Modify a Book
        </button>
        <button
            @click="selectButton('delete')"
            :class="getButtonClass('delete')"
            class="btn-black-red"
        >
          Delete a Book
        </button>
      </div>

      <!-- Right Content -->
      <div class="right-content">
        <!-- Book Modification Form and Categories -->
        <div class="book-form">
          <div class="upload-zone col p-3" @click="triggerUpload">
            <input type="file" ref="fileInput" @change="uploadImage" hidden />
            <div class="upload-content">
              <i class="upload-icon">⇧</i>
              <p><em>Drop your image here</em></p>
            </div>
          </div>

          <!-- Radio Buttons for Categories (Only visible when adding a book) -->
          <div class="category-container">
            <h3 style="margin: 30px">Categories</h3>

            <label
            ><input type="radio" name="category" value="1" v-model="selectedCategory" />
              Science-Fiction</label
            >
            <label
            ><input type="radio" name="category" value="2" v-model="selectedCategory" />
              Mystery & Thriller</label
            >
            <label
            ><input type="radio" name="category" value="3" v-model="selectedCategory" />
              Historical</label
            >
            <label
            ><input type="radio" name="category" value="4" v-model="selectedCategory" />
              Educational</label
            >
            <label
            ><input type="radio" name="category" value="5" v-model="selectedCategory" />
              Children</label
            >
          </div>

          <div class="book-details col p-3">
            <input
                v-model="book.title"
                :placeholder="isAdding ? 'Add Title' :'Choose Book in the search bar'"
                class="input-field"
                :readonly="!selectedBook && !isAdding"
                @click="handleInputClick"
            />
            <input
                v-model="book.author"
                :placeholder="isAdding ? 'Add Author' : ''"
                class="input-field"
                :readonly="!selectedBook && !isAdding"
                @click="handleInputClick"
            />
            <input
                v-model="book.years"
                :placeholder="isAdding ? 'Add publishing date (XXXX-XX-XX)' : ''"
                class="input-field"
                :readonly="!selectedBook && !isAdding"
                @click="handleInputClick"
            />
            <textarea
                v-model="book.description"
                :placeholder="isAdding ? 'Add Description' : ''"
                class="textarea-field"
                :readonly="!selectedBook && !isAdding"
                @click="handleInputClick"
            ></textarea>
            <button
                @click="
                isAdding
                  ? confirmAddBook()
                  : deleteMode
                  ? confirmDeleteBook()
                  : confirmModifyBook()
              "
                class="btn-black-white"

            >
              {{ isAdding ? "ADD" : rightButtonLabel }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Bar for Modifying or Deleting a Book -->
    <div v-if="deleteMode || modifyMode" class="delete-form dropdown">
      <div class="search-content">
        <input
            ref="searchBar"
            v-model="searchQuery"
            :placeholder="modifyMode ? 'Search for a book to modify' : 'Search for a book to delete'"
            class="form-control"
            @input="fetchBookToModify"

        />

        <!-- Dropdown des résultats -->
        <ul v-if="isDropdownVisible && foundBooks.length > 0" class="dropdown-menu show" style="display: block; position: absolute;">
          <h3 class="dropdown-header">Found Books:</h3>
          <li v-for="foundBook in foundBooks" :key="foundBook.id" class="dropdown-item">
            <label>
              <input
                  type="radio"
                  name="selectedBook"
                  :value="foundBook"
                  v-model="selectedBook"
                  @click="selectBook(foundBook)"

              />
              {{ foundBook.title }}
            </label>
          </li>
        </ul>
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
      selectedBook: null,
      isDropdownVisible: false,
      book: {
        title: "",
        author: "",
        years: null,
        description: "",
        img:"",
        category_id:null,
      },
      isAdding: true,
      deleteMode: false,
      modifyMode: false,
      selectedButton: "add",
      selectedCategory: null,

    };
  },
  methods: {
    selectButton(button) {
      this.selectedButton = button;

      if (button === "delete") {
        this.rightButtonLabel = "DELETE"; // Change button text
        this.deleteMode = true;
        this.modifyMode = false;
        this.isAdding = false;
      } else if (button === "modify") {
        this.rightButtonLabel = "MODIFY";
        this.modifyMode = true;
        this.deleteMode = false;
        this.isAdding = false;
      } else {
        this.rightButtonLabel = "MODIFY"; // default text
        this.deleteMode = false;
        this.modifyMode = false;
        this.isAdding = true;
      }

      if (button === "add") {
        this.addBook();
      }
    },

    getButtonClass(button) {
      return this.selectedButton === button ? "selected" : "";
    },

    async fetchBookToModify() {
      this.selectedBook=true;
      if (this.searchQuery.trim().length < 3) return; // Vérifie la longueur de la recherche

      try {
        const response = await fetch(`http://localhost:1234/api/books/?title=${encodeURIComponent(this.searchQuery)}&limit=999`);

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des livres");
        }

        const books = await response.json();


        if (Array.isArray(books) && books.length > 0) {
          this.foundBooks = books;  // Stocke les livres trouvés
          this.isDropdownVisible = this.foundBooks.length > 0;
        } else {
          this.foundBooks = []; // Si aucun livre trouvé, vide la liste
        }
      } catch (error) {
        console.error("Erreur API:", error);
      }
    },

    selectBook(book) {
      if (book && book.book_id) {
        this.book = { ...book };
        this.book.years=new Date(this.book.years).toISOString().slice(0, 10);
        this.isAdding = false;
        this.isDropdownVisible = false;
        this.searchQuery = "";
        this.selectedCategory = this.book.category_id;
      } else {
        console.error("Selected book does not have an ID.");
        alert("The selected book does not have a valid ID.");
      }
    },

    confirmModifyBook() {
      if (!this.selectedBook) {
        this.highlightSearchBar();
        alert("Please select a book before modifying.");
        return;
      }
      console.log("Modifying book:", this.book);
      if (!this.book.book_id) {
        console.error("Book ID is not defined.");
        alert("Please select a book to modify.");
        return;
      }
      this.book.category_id = this.selectedCategory;

      fetch(`http://localhost:1234/api/books/${this.book.book_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.book),
      })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed : ${response.statusText}`);
            }

            return response.json();
          })
          .then(data => {
            console.log("Book modified successfully:", data);
            this.selectedBook=false;
            this.resetForm(); // Reset form after modification

          })
          .catch((err) => {
            console.error(`Failed to modify book ${this.book.book_id}:`, err); // Plus de détails dans les logs
            alert(`Error: ${err.message}`);
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
        imageURL: this.book.img || "https://via.placeholder.com/150",
        category: this.selectedCategory,

      };

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

            this.resetForm();
          })
          .catch(err => {
            alert("Vérifiez les infos : " + err.message);
          });
    },

    confirmDeleteBook() {
      if (!this.selectedBook) {
        this.highlightSearchBar();
        alert("Please select a book before deleting.");
        return;
      }
      if (!this.book.book_id) {
        console.error("Book ID is not defined.");
        alert("Please select a book to delete.");
        return;
      }

      const confirmed = confirm(`Are you sure you want to delete "${this.book.title}"?`);
      if (!confirmed) return;

      console.log("Deleting book:", this.book.book_id);
      fetch(`http://localhost:1234/api/books/${this.book.book_id}`, {
        method: 'DELETE',
      })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to delete book: ${response.statusText}`);
            }
            console.log("Book deleted successfully.");
            this.selectedBook=false;
            this.resetForm(); // Reset the form after deletion
          })
          .catch(err => {
            console.error("Error deleting book:", err.message);
          });
      this.selectedBook=false;
    },

    highlightSearchBar() {
      const searchBar = this.$refs.searchBar;
      if (searchBar) {
        searchBar.classList.add('highlight');
        setTimeout(() => searchBar.classList.remove('highlight'), 2000); // L'effet dure 1.5 secondes
      }
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
        category: null,
      };
      this.searchQuery = "";
      this.foundBooks = [];
      this.selectedCategory=null;
    },

    handleInputClick() {
      if (!this.selectedBook && !this.isAdding) {
        this.highlightSearchBar(); // Mettre en évidence la barre de recherche
      }
    },

  },
};
</script>

<style scoped>
#booksManager {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
}
.admin-books {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  padding: 50px;
}

.category-radio label {
  display: flex;
  align-items: center;
  gap: 10px; /* Ajuste l'espace entre l'icône et le texte */
}

.category-radio input[type="radio"] {
  position: relative;
  top: 0; /* Assure l'alignement vertical */
  /* Ajoute un espace fixe entre l'icône et le texte */
  margin: 0 10px 0 0;
  flex-shrink: 0; /* Empêche l'icône de se redimensionner avec le texte */
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  margin-top: 50px;
  width: 300px;
}

.category-container {
  display: flex;
  flex-direction: column;
  line-height: 2;
}

.action-buttons button {
  padding: 12px;
  border-radius: 5px;
  font-size: 14px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.btn-black-white,
.btn-black-red {
  background-color: black;
  color: white;
  border: 1px solid black;
  border-radius: 5px;
}

.btn-black-white:hover,
.btn-black-red:hover {
  background-color: white;
  color: black;
}

.selected {
  background-color: white !important;
  color: black !important;
}

.right-content {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.book-form {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex: 1;
}

.upload-zone {
  width: 170px;
  height: 300px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  top: 10px;
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

.book-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.category-radio {
  display: flex;
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

.delete-form {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.search-content {
  display: flex;
  align-items: center;
  position: relative;
  left: 55px;
  top: -100px;
}

.btn-disabled {
  background-color: #cccccc;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
}

.btn-disabled:hover {
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .admin-books {
    grid-template-columns: 1fr;
  }

  .right-content {
    flex-direction: column;
  }
}

.highlight {
  border: 2px solid red;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  transition: border 0.3s, box-shadow 0.3s; /* Transition douce */
}

</style>