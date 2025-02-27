import React from 'react'
import './App.css'
import InternetDisconnectPopup from './Components/InternetDisconnectPopup'
import { ToastContainer } from 'react-toastify'
import Routing from './Routing'



const App = () => {
  return (
    <>
 
      <InternetDisconnectPopup />
      {/*toast-container */}

      <Routing />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App