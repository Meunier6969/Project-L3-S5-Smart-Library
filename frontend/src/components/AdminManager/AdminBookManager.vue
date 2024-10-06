<template>
  <div class="container-fluid mt-3">
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
              ><input type="radio" name="category" value="Science-Fiction" />
              Science-Fiction</label
            >
            <label
              ><input type="radio" name="category" value="Mystery & Thriller" />
              Mystery & Thriller</label
            >
            <label
              ><input type="radio" name="category" value="Historical" />
              Historical</label
            >
            <label
              ><input type="radio" name="category" value="Educational" />
              Educational</label
            >
            <label
              ><input type="radio" name="category" value="For Children" /> For
              Children</label
            >
          </div>

          <div class="book-details col p-3">
            <input
              v-model="book.title"
              :placeholder="isAdding ? 'Add Title' : ''"
              class="input-field"
            />
            <input
              v-model="book.author"
              :placeholder="isAdding ? 'Add Author' : ''"
              class="input-field"
            />
            <input
              v-model="book.year"
              :placeholder="isAdding ? 'Add publishing date' : ''"
              class="input-field"
            />
            <textarea
              v-model="book.description"
              :placeholder="isAdding ? 'Add Description' : ''"
              class="textarea-field"
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
    <div v-if="deleteMode || modifyMode" class="delete-form">
      <div class="search-content">
        <input
          v-model="searchQuery"
          :placeholder="
            modifyMode
              ? 'Search for a book to modify'
              : 'Search for a book to delete'
          "
          class="input-field"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      book: {
        title: "",
        author: "",
        year: null,
        description: "",
      },
      isAdding: true,
      deleteMode: false,
      modifyMode: false,
      selectedButton: "add", // Tracks the selected button
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

    confirmDeleteBook() {
      console.log("Deleting book:", this.book);
    },
    getButtonClass(button) {
      return this.selectedButton === button ? "selected" : "";
    },
    confirmModifyBook() {
      console.log("Modifying book:", this.book);
    },
    confirmAddBook() {
      console.log("Adding book:", this.book);
    },
    addBook() {
      this.isAdding = true;
      this.deleteMode = false;
      this.modifyMode = false;
      this.resetForm();
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
    uploadImage(event) {
      const file = event.target.files[0];
      console.log("Uploading image:", file);
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    resetForm() {
      this.book = {
        title: "",
        author: "",
        year: "",
        description: "",
      };
    },
  },
};
</script>

<style scoped>
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
  margin: 0;
  position: relative;
  top: 0; /* Assure l'alignement vertical */
  margin-right: 10px; /* Ajoute un espace fixe entre l'icône et le texte */
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
</style>
