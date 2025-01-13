import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title :{type : String, required : true},
    cast : {type : String , required : true},
    date : {type : Date, required : true},
    genre : {type : String, required : true}
})

const movieModel =  mongoose.models.movieData || mongoose.model('movieData', movieSchema)

export default movieModel