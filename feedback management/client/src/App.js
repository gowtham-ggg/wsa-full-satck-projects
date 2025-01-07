import React from 'react'
import "./index.css"
import Ui from './components/Ui'
import {ToastContainer} from "react-toastify"

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Ui/>
    </div>
  )
}

export default App
