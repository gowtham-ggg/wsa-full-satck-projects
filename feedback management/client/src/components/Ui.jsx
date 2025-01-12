import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Ui = () => {
  const [feedback, setFeedback] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [editId, setEditId] = useState(null); // To track feedback being edited

  const url = "http://localhost:4000/feedback";

  // Fetch feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(url);
        setFeedback(response.data.data || []);
        toast.success("Feedback fetched successfully");
      } catch (error) {
        toast.error(`Error fetching feedback: ${error.message}`);
      }
    };

    fetchFeedback();
  }, []);

  // Add or Update feedback
  const saveFeedback = async () => {
    try {
      if (editId) {
        // Update existing feedback
        const response = await axios.put(`${url}/${editId}`, form);
        setFeedback(
          feedback.map((item) =>
            item._id === editId ? response.data.data : item
          )
        );
        toast.success("Feedback updated successfully");
        setEditId(null);
      } else {
        // Add new feedback
        const response = await axios.post(url, form);
        setFeedback([...feedback, response.data.data]);
        toast.success("Feedback added successfully");
      }
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(
        `Error ${editId ? "updating" : "adding"} feedback: ${error.message}`
      );
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    saveFeedback();
  };

  // Delete feedback
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      setFeedback(feedback.filter((item) => item._id !== id));
      toast.success("Feedback deleted successfully");
    } catch (error) {
      toast.error(`Error deleting feedback: ${error.message}`);
    }
  };

  // Edit feedback
  const handleEdit = (item) => {
    setForm({ name: item.name, email: item.email, message: item.message });
    setEditId(item._id);
  };

  return (
    <div className="container mx-auto p-5">
      {/* Header */}
      <h1 className="text-center text-3xl font-bold text-blue-600 mb-5">
        Feedback Management System
      </h1>

      {/* Feedback Form */}
      <form
        className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10 bg-gray-100 p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full sm:w-1/4 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="w-full sm:w-1/4 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          className="w-full sm:w-1/4 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Message"
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
          type="submit"
        >
          {editId ? "Update Feedback" : "Add Feedback"}
        </button>
      </form>

      {/* Feedback Table */}
      <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Message</th>
            <th className="p-4 text-left">Date & Time</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((item, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-100 transition-all"
            >
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.email}</td>
              <td className="p-4">{item.message}</td>
              <td className="p-4">
                {item.date} | {item.time}
              </td>
              <td className="p-4 text-center flex justify-center space-x-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-all"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                  onClick={() => handleDelete(item._id)}
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

export default Ui;
