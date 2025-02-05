import React, { useState } from 'react'
import Uber_logo from '../assets/uber-driver.svg';
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, userCaptainData] = useState({});
  
  
  
  
    const sumbitHandler = (e) => {
      e.preventDefault();
      userCaptainData({ email: email, password: password });
      console.log(captainData);
      setEmail('');
      setPassword('');
  
    }
  return (
   <>
    <div className='p-5 flex flex-col justify-between h-screen'>
        <div>
          <img src={Uber_logo} alt="" className="w-20 mb-8" />
          <form onSubmit={sumbitHandler}>

            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input type="email" name="" id="" placeholder='email@example.com'
              required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input type="password" name="" id="" placeholder='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />

            <button className='text-center text-lg w-full bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2'>Login</button>
            <p className='text-center font-semibold'>Join a Feet? <Link className='text-blue-600' to='/captain-signup'>Register as a Captain</Link></p>
          </form>
        </div>
        <div><Link to='/captain-login'><button className='text-center text-lg w-full bg-[#d5622d] text-white font-semibold mb-7 rounded px-4 py-2'>Sign in as Captain</button></Link></div>
      </div>
   
   </>
  )
}

export default CaptainLogin