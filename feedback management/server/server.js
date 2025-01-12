import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import feedBack from "./models/feedBack.js";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/feedbackDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database connection error:", error));

// GET all feedback
app.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await feedBack.find();
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching feedback", error });
  }
});

// POST feedback
app.post('/feedback', async (req, res) => {
  const { name, email, message } = req.body;
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newFeedback = new feedBack({ name, email, message, time, date });
    const savedFeedback = await newFeedback.save();
    res.json({ success: true, message: "Feedback added successfully", data: savedFeedback });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding feedback", error });
  }
});

// UPDATE feedback by ID
app.put('/feedback/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const updatedFeedback = await feedBack.findByIdAndUpdate(
      id,
      { name, email, message },
      { new: true, runValidators: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }

    res.json({ success: true, message: "Feedback updated successfully", data: updatedFeedback });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating feedback", error });
  }
});

// DELETE feedback by ID
app.delete('/feedback/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFeedback = await feedBack.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }
    res.json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting feedback", error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
