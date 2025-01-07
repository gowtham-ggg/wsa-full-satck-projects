import React from 'react'
import Books from './components/Books'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div >
      <ToastContainer/>
        <Books/>
    </div>
  )
}

export default App
