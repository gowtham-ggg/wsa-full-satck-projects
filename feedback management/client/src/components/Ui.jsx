import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Ui = () => {
  const [feedback, setFeedback] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const url = 'http://localhost:4000/feedback';

  // Fetch feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(url);
        setFeedback(response.data.data || []);
        toast.success('Fetched Successfully');
      } catch (error) {
        toast.error(`Error fetching data: ${error.message}`);
      }
    };

    fetchFeedback();
  }, []);

  // Add feedback
  const addFeedback = async () => {
    try {
      const response = await axios.post(url, form);
      setFeedback([...feedback, response.data.data]);
      setForm({ name: '', email: '', message: '' });
      toast.success('Added successfully');
    } catch (error) {
      toast.error(`Error adding feedback: ${error.message}`);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addFeedback();
  };

  return (
    <div>
      <h1>Feedback Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <button type="submit">Add</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.message}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ui;
