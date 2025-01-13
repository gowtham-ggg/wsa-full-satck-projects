import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from "axios"
import {toast} from 'react-toastify'


const Movie = () => {

    const [movie, setMovie] = useState([])
    const [form, setForm] = useState({title : "",cast : "",date : "",genre : ""})

    const backendUrl = "http://localhost:4000/movie"

    const getData = async ()=>{
        try {

            const movieData = await axios.get(backendUrl)
            setMovie(movieData.data.data || [])
            toast.success("Fetched Sucessfully")
        } catch (error) {
            
        }
    }

    const addData = async () =>{

        try {

            const newData = await axios.post(backendUrl, form)
            setMovie([...movie, newData.data.data])
            toast.success("Added ✅")
            setForm({title : "",cast : "",date : "",genre : ""})
        } catch (error) {
            toast.error("Failed ❌")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addData()
      };

    useEffect(()=>{
        getData()
    },[])

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
  <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-2xl p-8">
    <h1 className="text-3xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
      Upcoming Movie List 🎬
    </h1>
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        type="text"
        placeholder="Movie Name"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
      />
      <input
        value={form.cast}
        onChange={(e) => setForm({ ...form, cast: e.target.value })}
        type="text"
        placeholder="Cast"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
      />
      <input
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        type="date"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-500"
      />
      <input
        value={form.genre}
        onChange={(e) => setForm({ ...form, genre: e.target.value })}
        type="text"
        placeholder="Genre"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300"
      >
        Add Movie 🎥
      </button>
    </form>
  </div>
  <Card data={movie}/>
</div>

  );
};

export default Movie;
