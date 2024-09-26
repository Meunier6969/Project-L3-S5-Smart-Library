
<template>
    <div class="book-modify-grid">
      <!-- Left Column: Action Buttons -->
      <div class="action-buttons">
        <button @click="addBook">Add a book</button>
        <button @click="modifyBook">Modify a book</button>
        <button @click="deleteBook">Delete a book</button>
      </div>
  
      <!-- Right Column: Book Modification Form -->
      <div class="book-form">
        <div class="book-image">
          <!-- Book Image Upload Section -->
          <input type="file" @change="uploadImage" />
        </div>
        <div class="book-details">
          <input v-model="book.title" placeholder="Modifier le titre" />
          <input v-model="book.author" placeholder="Modifier l'auteur" />
          <input v-model="book.year" placeholder="Modifier l'année" />
          <textarea v-model="book.description" placeholder="Modifier la description"></textarea>
          <button @click="modifyBook">MODIFY</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',  // For the search functionality
        book: {
          title: 'Fondation',
          author: 'Isaac Asimov',
          year: 1968,
          description: 'For twelve thousand years the Galactic Empire has ruled supreme...'
        }
      };
    },
    methods: {
      // Function to handle book modification
      modifyBook() {
        console.log('Modifying book:', this.book);
      },
      // Function to handle adding a book
      addBook() {
        this.book = {
          title: '',
          author: '',
          year: '',
          description: ''
        };
      },
      // Function to handle deleting a book
      deleteBook() {
        console.log('Deleting book:', this.book.title);
      },
      // Handle image upload
      uploadImage(event) {
        const file = event.target.files[0];
        console.log('Uploading image:', file);
      }
    }
  };
  </script>
  
  <style scoped>
  .book-modify-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    justify-content: center;
    align-items: center;
    height: 100vh;  /* Full height */
  }
  
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }
  
  .action-buttons button {
    width: 100%;
    padding: 15px;
    background-color: lightgray;
    border: none;
    cursor: pointer;
  }
  
  .book-form {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
  
  .book-image {
    width: 150px;
    height: 200px;
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .book-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .book-details input, .book-details textarea {
    padding: 8px;
    width: 100%;
  }
  
  button {
    padding: 10px;
    background-color: lightgray;
    border: none;
    cursor: pointer;
  }
  </style>
  