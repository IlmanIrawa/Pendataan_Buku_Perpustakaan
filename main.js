document.addEventListener('DOMContentLoaded', function () {
    const books = JSON.parse(localStorage.getItem('books')) || [];
  
    function saveBooks() {
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    function renderBooks() {
      const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
      const completeBookshelfList = document.getElementById('completeBookshelfList');
  
      incompleteBookshelfList.innerHTML = '';
      completeBookshelfList.innerHTML = '';
  
      for (const book of books) {
        const bookElement = document.createElement('article');
        bookElement.classList.add('book_item');
        bookElement.innerHTML = `
          <h3>${book.title}</h3>
          <p>Penulis: ${book.author}</p>
          <p>Tahun: ${book.year}</p>
          <div class="action">
            <button class="green">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
            <button class="red">Hapus buku</button>
          </div>
        `;
  
        bookElement.querySelector('.green').addEventListener('click', function () {
          book.isComplete = !book.isComplete;
          saveBooks();
          renderBooks();
        });
  
        bookElement.querySelector('.red').addEventListener('click', function () {
          const bookIndex = books.indexOf(book);
          books.splice(bookIndex, 1);
          saveBooks();
          renderBooks();
        });
  
        if (book.isComplete) {
          completeBookshelfList.appendChild(bookElement);
        } else {
          incompleteBookshelfList.appendChild(bookElement);
        }
      }
    }
  
    document.getElementById('inputBook').addEventListener('submit', function (event) {
      event.preventDefault();
  
      const title = document.getElementById('inputBookTitle').value;
      const author = document.getElementById('inputBookAuthor').value;
      const year = document.getElementById('inputBookYear').value;
      const isComplete = document.getElementById('inputBookIsComplete').checked;
  
      const newBook = { title, author, year, isComplete };
      books.push(newBook);
      saveBooks();
      renderBooks();
  
      document.getElementById('inputBook').reset();
    });
  
    document.getElementById('searchBook').addEventListener('submit', function (event) {
      event.preventDefault();
  
      const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();
  
      const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTitle));
      const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
      const completeBookshelfList = document.getElementById('completeBookshelfList');
  
      incompleteBookshelfList.innerHTML = '';
      completeBookshelfList.innerHTML = '';
  
      for (const book of filteredBooks) {
        const bookElement = document.createElement('article');
        bookElement.classList.add('book_item');
        bookElement.innerHTML = `
          <h3>${book.title}</h3>
          <p>Penulis: ${book.author}</p>
          <p>Tahun: ${book.year}</p>
          <div class="action">
            <button class="green">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
            <button class="red">Hapus buku</button>
          </div>
        `;
  
        bookElement.querySelector('.green').addEventListener('click', function () {
          book.isComplete = !book.isComplete;
          saveBooks();
          renderBooks();
        });
  
        bookElement.querySelector('.red').addEventListener('click', function () {
          const bookIndex = books.indexOf(book);
          books.splice(bookIndex, 1);
          saveBooks();
          renderBooks();
        });
  
        if (book.isComplete) {
          completeBookshelfList.appendChild(bookElement);
        } else {
          incompleteBookshelfList.appendChild(bookElement);
        }
      }
    });
  
    renderBooks();
  });
  