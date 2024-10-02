<template>
  <div class="admin-container">
  <!-- Left Column: Action Buttons -->
  <div class="action-buttons">
    <button @click="addBook" class="btn-black-white">Add a Book</button>
    <button @click="modifyBook" class="btn-black-white">Modify a Book</button>
    <button @click="deleteBook" class="btn-black-red">Delete a Book</button>
  </div>

  <!-- Right Column: Book Modification Form -->
  <div class="book-form" v-if="!deleteMode">
    <div class="book-image">
      <!-- Book Image Upload Section -->
      <input type="file" @change="uploadImage" class="image-input" />
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
          v-model="book.year"
          :placeholder="isAdding ? 'Add Year' : 'Edit Year'"
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

  <!-- Search Bar for Deleting a Book -->
  <div v-if="deleteMode" class="delete-form">
    <input
        v-model="searchQuery"
        placeholder="Search for a book to delete"
        class="input-field"
    />
    <button class="btn-disabled" disabled>DELETE</button>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "", // For the search functionality
      book: {
        title: "Fondation",
        author: "Isaac Asimov",
        year: 1968,
        description:
            "For twelve thousand years the Galactic Empire has ruled supreme...",
      },
      isAdding: false, // Tracks if we're in "add" mode
      deleteMode: false, // Tracks if we're in "delete" mode
    };
  },
  methods: {
    // Function to handle book modification
    confirmModifyBook() {
      console.log("Modifying book:", this.book);
    },
    // Function to handle adding a book
    confirmAddBook() {
      console.log("Adding book:", this.book);
    },
    // Switch to add mode
    addBook() {
      this.isAdding = true;
      this.deleteMode = false;
      this.resetForm();
    },
    // Switch to modify mode
    modifyBook() {
      this.isAdding = false;
      this.deleteMode = false;
    },
    // Switch to delete mode
    deleteBook() {
      this.isAdding = false;
      this.deleteMode = true;
    },
    // Handle image upload
    uploadImage(event) {
      const file = event.target.files[0];
      console.log("Uploading image:", file);
    },
    // Reset the form when adding a book
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

.admin-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  padding: 50px;
  align-items: center;
}
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  color: white;
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

.book-image {
  width: 150px;
  height: 200px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.image-input {
  margin-bottom: 20px; /* Place image input above the book image */
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
  flex-direction: column;
  gap: 10px;
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
</style>
