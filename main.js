document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-button');
  const resultsContainer = document.getElementById('results-container');

  searchButton.addEventListener('click', async () => {
    const categoryInput = document.getElementById('category-input');
    const category = categoryInput.value;
    
    resultsContainer.innerHTML = '';

    try {
      const response = await axios.get(`https://openlibrary.org/subjects/${category}.json`);
      const data = response.data;

      const books = data.works.map(work => ({
        key: work.key,
        title: work.title,
        authors: work.authors,
      }));

      for (const book of books) {
        const bookElement = document.createElement('div');
        const titleElement = document.createElement('h3');
        const authorsElement = document.createElement('p');

        titleElement.textContent = book.title;
        authorsElement.textContent = `Authors: ${book.authors.join(', ')}`;

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorsElement);
        resultsContainer.appendChild(bookElement);

        bookElement.addEventListener('click', async () => {
          const descriptionResponse = await axios.get(`https://openlibrary.org${book.key}.json`);
          const descriptionData = descriptionResponse.data;
          
          const description = descriptionData.description || 'No description available';

          alert(description);
        });
      }
    } catch (error) {
      console.error('Error searching books:', error.message);
    }
  });
});
