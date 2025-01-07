import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", year: "" });
  const [editId, setEditId] = useState(null);

  const url = "http://localhost:4000/books";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        toast.error("Error fetching books", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateBook();
    } else {
      addBook();
    }
  };

  const addBook = () => {
    axios
      .post(url, form)
      .then((response) => {
        setBooks([...books, response.data.data]);
        setForm({ title: "", author: "", year: "" });
        toast.success("Added successfully...");
      })
      .catch((error) => {
        toast.error("Failed to add book", error);
      });
  };

  const updateBook = () => {
    axios
      .put(`${url}/${editId}`, form)
      .then((response) => {
        setBooks(
          books.map((book) =>
            book._id === editId ? { ...book, ...form } : book
          )
        );
        setForm({ title: "", author: "", year: "" });
        setEditId(null); // Reset edit state
        toast.success("Updated successfully...");
      })
      .catch((error) => {
        toast.error("Failed to update book", error);
      });
  };

  const deleteBook = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book._id !== id)); // Use _id here
        toast.success("Deleted successfully...");
      })
      .catch((error) => {
        toast.error("Failed to delete book", error);
      });
  };

  const handleEdit = (book) => {
    setForm({ title: book.title, author: book.author, year: book.year });
    setEditId(book._id); // Use _id here
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto h-[100vh] bg-gradient-to-br from-gray-700 to-neutral-500 rounded-md overflow-y-scroll">
      <h1 className="pt-5 text-center text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Organize Your Library, Simplify Your Life
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 justify-center mt-10 px-5"
      >
        <input
          type="text"
          placeholder="Title"
          className="text-lg text-gray-900 rounded-lg p-3 w-full max-w-xs focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition-all duration-200"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Author"
          className="text-lg text-gray-900 rounded-lg p-3 w-full max-w-xs focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition-all duration-200"
          name="author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Year"
          className="text-lg text-gray-900 rounded-lg p-3 w-full max-w-xs focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition-all duration-200"
          name="year"
          value={form.year}
          onChange={handleChange}
          required
        />
        <button className="bg-blue-500 px-8 py-3 text-white text-lg font-semibold rounded-full hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-lg">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <table className="w-full max-w-4xl mx-auto mt-10 border-collapse overflow-hidden shadow-lg rounded-lg">
        <thead>
          <tr className="bg-blue-500 text-white text-left">
            <th className="p-4 text-lg font-semibold">Title</th>
            <th className="p-4 text-lg font-semibold">Author</th>
            <th className="p-4 text-lg font-semibold">Year</th>
            <th className="p-4 text-lg font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={index}
              className="odd:bg-gray-100 even:bg-white hover:bg-lime-200 transition-colors duration-200"
            >
              <td className="p-4 border-b border-gray-200">{book.title}</td>
              <td className="p-4 border-b border-gray-200">{book.author}</td>
              <td className="p-4 border-b border-gray-200">{book.year}</td>
              <td className="p-4 border-b border-gray-200 space-x-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:scale-105 transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBook(book._id)} // Use _id here
                  className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:scale-105 transition-all duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
