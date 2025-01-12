import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Object, required: false },
  date: { type: Object, required: false },
});

export default mongoose.model('Feedback', feedbackSchema);
