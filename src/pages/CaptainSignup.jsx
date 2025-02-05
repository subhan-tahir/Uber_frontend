import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Uber_logo from '../assets/uber-driver.svg';
const CaptainSignup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirsNname] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({});




  const sumbitHandler = (e) => {
    e.preventDefault();
    setUserData({fullName:{firstName:firstName,lastName:lastName}, email: email, password: password });
    console.log(userData);
    setFirsNname('');
    setLastName('');
    setEmail('');
    setPassword('');
  }



  return (
    <>
     <div className='p-5 flex flex-col justify-between h-screen'>
        <div>
          <img src={Uber_logo} alt="" className="w-20 mb-8" />
          <form onSubmit={sumbitHandler}>

            <h3 className='text-lg font-medium mb-2'>What's your name</h3>
            {/*input group */}
            <div className='flex gap-2 mb-5'>
              <input type="text" name="" id="" placeholder='First name'
                required value={firstName}
                onChange={(e) => setFirsNname(e.target.value)}
                className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-sm' />

              <input type="text" name="" id="" placeholder='Last name'
                required value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-sm' />
            </div>
            {/*email field */}
            <div className=''>
              <h3 className='text-lg font-medium mb-2'>What's your email</h3>
              <input type="email" name="" id="" placeholder='email@example.com'
                required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm' />
            </div>
            {/*password field */}
            <div className=''>
              <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
              <input type="password" name="" id="" placeholder='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm' />
            </div>

            <button className='text-center text-lg w-full bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2'>Signup</button>
            <p className='text-center font-semibold'>Already have a account? <Link className='text-blue-600' to='/login'>Login here</Link></p>
          </form>
        </div>
        <div><p className='text-[12px] text-gray-600 leading-tight'>This site is protected by reCATCHA and the <span className='underline'>Google Privacy Policy </span> and <span className='underline'>Terms of Service apply.</span></p></div>
      </div>
    
    </>
  )
}

export default CaptainSignup