<template>
  <div class="admin-books">

    <!-- Left Column: Action Buttons -->
    <div class="action-buttons">
      <button @click="addBook" class="btn-black-white">Add a Book</button>
      <button @click="modifyBook" class="btn-black-white">Modify a Book</button>
      <button @click="deleteBook" class="btn-black-red">Delete a Book</button>
    </div>

    <!-- Right Column: Book Modification Form -->
    <div v-if="!deleteMode && !modifyMode" class="book-form">
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
          v-model="book.year"
          :placeholder="
            isAdding ? 'Add publishing date' : 'Edit publishing date'
          "
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

    <!-- Search Bar for Modifying or Deleting a Book -->
    <div v-if="deleteMode || modifyMode" class="delete-form">
      <input
        v-model="searchQuery"
        :placeholder="
          modifyMode
            ? 'Search for a book to modify'
            : 'Search for a book to delete'
        "
        class="input-field"
      />
      <button class="btn-disabled" disabled>
        {{ modifyMode ? "MODIFY" : "DELETE" }}
      </button>
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
      modifyMode: false, // Tracks if we're in "modify" mode
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
      this.modifyMode = false;
      this.resetForm();
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
    },
  },
};
</script>

<style scoped>
.book-details {
  flex-basis: 100%;
  max-width: 420px;
  min-width: 50px;
  width: 100%;
}

.admin-books {
  display: grid;
  grid-template-columns: 1fr 2fr;

  background-color: #f5f5f5;
  height: 40vh;
  padding: 50px;

  align-items: center;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  top: -20px;
  margin-left: 80px;
  flex-basis: 100%;
  max-width: 300px;
  min-width: 20px;
  width: 100%;
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
