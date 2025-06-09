const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];

// Get all books
app.get("/books", (req, res) => {
    res.json(books);
});

// Add a new book
app.post("/books", (req, res) => {
    const book = { id: books.length + 1, ...req.body };
    books.push(book);
    res.status(201).json(book);
});

// Update a book
app.put("/books/:id", (req, res) => {
    const { id } = req.params;
    const index = books.findIndex(book => book.id == id);
    if (index !== -1) {
        books[index] = { id: Number(id), ...req.body };
        res.json(books[index]);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Delete a book
app.delete("/books/:id", (req, res) => {
    const { id } = req.params;
    books = books.filter(book => book.id != id);
    res.json({ message: "Book deleted" });
});
app.get("/", (req, res) => {
    res.send("📚 Welcome to the Book API! Use /books to interact.");
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});