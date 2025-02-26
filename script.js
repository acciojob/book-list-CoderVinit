//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
    // Load books from local storage on page load
    loadBooksFromLocalStorage();

    // Handle book submission
    document.getElementById("submit").addEventListener("click", function() {
        addBook();
    });

    // Handle book deletion
    document.getElementById("book-list").addEventListener("click", function(e) {
        if (e.target.classList.contains("delete")) {
            e.target.parentElement.parentElement.remove();
            saveBooksToLocalStorage();
        }
    });
});

// Function to add a book to the list
function addBook() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const isbn = document.getElementById("isbn").value.trim();

    if (title === "" || author === "" || isbn === "") {
        alert("Please fill in all fields.");
        return;
    }

    const bookList = document.getElementById("book-list");

    // Create table row
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${isbn}</td>
        <td><button class="delete">x</button></td>
    `;

    bookList.appendChild(row);

    // Save book list to local storage
    saveBooksToLocalStorage();

    // Clear input fields
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}

// Function to save books to local storage
function saveBooksToLocalStorage() {
    const books = [];
    document.querySelectorAll("#book-list tr").forEach(row => {
        const title = row.cells[0].textContent;
        const author = row.cells[1].textContent;
        const isbn = row.cells[2].textContent;
        books.push({ title, author, isbn });
    });
    localStorage.setItem("books", JSON.stringify(books));
}

// Function to load books from local storage
function loadBooksFromLocalStorage() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const bookList = document.getElementById("book-list");

    books.forEach(book => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><button class="delete">x</button></td>
        `;
        bookList.appendChild(row);
    });
}

