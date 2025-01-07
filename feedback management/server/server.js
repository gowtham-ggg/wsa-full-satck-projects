import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const feedback = [];

// GET all feedback
app.get('/feedback', (req, res) => {
    res.json({ success: true, data: feedback });
});

// POST feedback
app.post('/feedback', (req, res) => {
    const { name, email, message } = req.body;
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newFeedbackData = {
        id: feedback.length + 1,
        name,
        email,
        message,
        time,
        date
    };
    feedback.push(newFeedbackData);
    res.json({ success: true, message: "Feedback added successfully", data: newFeedbackData });
});

// GET feedback by ID
app.get('/feedback/:id', (req, res) => {
    const feedbackId = parseInt(req.params.id, 10);
    const feedbackItem = feedback.find(b => b.id === feedbackId);

    if (!feedbackItem) {
        return res.status(404).json({ success: false, message: "Feedback not found" });
    }

    res.json({ success: true, message: "Feedback found", data: feedbackItem });
});

// DELETE feedback by ID
app.delete('/feedback/:id', (req, res) => {
    const feedbackId = parseInt(req.params.id, 10);
    const feedbackIndex = feedback.findIndex(b => b.id === feedbackId);

    if (feedbackIndex === -1) {
        return res.status(404).json({ success: false, message: "Feedback not found" });
    }

    feedback.splice(feedbackIndex, 1);
    res.json({ success: true, message: "Feedback deleted successfully" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
