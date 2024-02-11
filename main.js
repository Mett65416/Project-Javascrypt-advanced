const searchButton = document.getElementById('searchButton');
const categoryInput = document.getElementById('categoryInput');
const resultsContainer = document.getElementById('resultsContainer');
const descriptionContainer = document.getElementById('descriptionContainer');

searchButton.addEventListener('click', searchBooks);

async function searchBooks() {
  const category = categoryInput.value;
  const url = `https://openlibrary.org/subjects/${category}.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const works = data.works;

    resultsContainer.innerHTML = '';

    works.forEach((work) => {
      const title = work.title;
      const authors = work.authors.map((author) => author.name).join(', ');

      const bookElement = document.createElement('div');
      bookElement.innerHTML = `<h3>${title}</h3><p>${authors}</p>`;
      bookElement.addEventListener('click', () => {
        getBookDescription(work.key);
      });

      resultsContainer.appendChild(bookElement);
    });
  } catch (error) {
    console.log(error);
  }
}

async function getBookDescription(key) {
  const url = `https://openlibrary.org${key}.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const description = data.description;

    descriptionContainer.innerHTML = '';

    const descriptionElement = document.createElement('div');
    descriptionElement.innerHTML = `<p>${description}</p>`;

    descriptionContainer.appendChild(descriptionElement);
  } catch (error) {
    console.log(error);
  }
}
