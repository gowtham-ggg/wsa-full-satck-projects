import React from 'react'
import Movie from './components/Movie'
import "./index.css"
import {ToastContainer} from 'react-toastify'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Movie/>
    </div>
  )
}

export default App
