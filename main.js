// Import the necessary libraries
const axios = require('axios');
const dotenv = require('dotenv');
const _ = require('lodash');

// Load environment variables from a .env file
dotenv.config();

// Function to search books by category
async function searchBooks(category) {
  try {
    const response = await axios.get(`https://openlibrary.org/subjects/${category}.json`);
    const data = response.data;

    const books = data.works.map(work => ({
      title: work.title,
      authors: work.authors,
    }));

    return books;
  } catch (error) {
    console.error('Error searching books:', error.message);
    return [];
  }
}

// Function to get book description by key
async function getBookDescription(key) {
  try {
    const response = await axios.get(`https://openlibrary.org${key}.json`);
    const data = response.data;

    return data.description;
  } catch (error) {
    console.error('Error getting book description:', error.message);
    return '';
  }
}

// Example usage
const category = 'fantasy';
searchBooks(category)
  .then(books => {
    for (const book of books) {
      console.log('Title:', book.title);
      console.log('Authors:', book.authors.join(', '));
      console.log();
    }
  })
  .catch(error => {
    console.error('Error searching books:', error.message);
  });

const bookKey = '/works/OL8193508W';
getBookDescription(bookKey)
  .then(description => {
    console.log('Description:', description);
  })
  .catch(error => {
    console.error('Error getting book description:', error.message);
  });
