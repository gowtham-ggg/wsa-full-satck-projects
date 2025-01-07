import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import Book from './model/bookModel.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore')
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log("Error connecting to the database:", error));

// Routes

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching books" });
  }
});

// Add a new book
app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newBook = new Book({ title, author, year });
    await newBook.save();
    res.status(201).json({ success: true, message: "Book added", data: newBook });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding book" });
  }
});

// Update a book
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, year } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, year },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.json({ success: true, message: "Book updated", data: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating book" });
  }
});

// Delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.json({ success: true, message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting book" });
  }
});


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
