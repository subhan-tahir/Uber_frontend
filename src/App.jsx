import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Dashboard from './pages/Dashboard'
import Private from './Private'
import Riding from './pages/Riding'
import CaptainHome from './pages/CaptainHome'
import CaptainRiding from './pages/CaptainRiding'
import './App.css'
import AnimatePanelProvider from './context/AnimatePanelContext'
import InternetDisconnectPopup from './Components/InternetDisconnectPopup'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <>
      <Routes>

        <Route path='/' element={<Home />} />
        {/* Protected Route */}
        <Route path='/dashboard' element={
          <Private>
            <AnimatePanelProvider>
              <Dashboard />
            </AnimatePanelProvider>
          </Private>
        }>
        </Route>


        {/* public Routes */}
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />}></Route>
        <Route path='/signup' element={<UserSignup />} />
        <Route path='captain-login' element={<CaptainLogin />} />
        <Route path='captain-signup' element={<CaptainSignup />} />
        <Route path='captain-home' element={<CaptainHome />} />
        <Route path='captain-riding' element={<CaptainRiding />} />


      </Routes>
      <InternetDisconnectPopup />
      {/*toast-container */}
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
        // transition={Bounce}
      />
    </>
  )
}

export default App