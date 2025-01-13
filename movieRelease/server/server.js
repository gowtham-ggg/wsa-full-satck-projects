import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import movieModel from "./models/movieModel.js";

const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/MovieDb")
  .then(() => console.log("Connected to the database successfully."))
  .catch((error) => console.error("Error connecting to the database:", error));

// Routes
app.get('/movie', async (req, res) => {
  try {
    const movieData = await movieModel.find();
    res.json({ success: true, message: "Movies fetched successfully.", data: movieData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching movies.", error: error.message });
  }
});

app.post("/movie", async (req, res) => {
  const { title, cast, date, genre } = req.body;

  if (!title || !cast || !date || !genre) {
    return res.status(400).json({ success: false, message: "All fields (title, cast, date, genre) are required." });
  }

  try {
    const newMovieData = new movieModel({ title, cast, date, genre });
    const savedMovieData = await newMovieData.save();
    res.status(201).json({ success: true, message: "Movie added successfully.", data: savedMovieData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add movie.", error: error.message });
  }
});


app.delete("/movie:/id", async (req, res)=>{

    const {id} = req.body


    try {

        const deleteMovie = await movieModel.findOneAndDelete(id)

        if(!deleteMovie){
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        res.status(500).json({success : true, message : "Deleted ✅"})
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to Delete movie.", error: error.message });
    }
})


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
