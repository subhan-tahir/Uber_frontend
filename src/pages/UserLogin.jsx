import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Uber_logo from '../assets/Uber_logo.png';
import { Link, useNavigate } from 'react-router-dom';
// import { UserDataContext } from '../context/UserContext';
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const UserLogin = () => {
  // const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState('');
  const[passwordVisible,setPasswordVisible] = useState(false);
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/Uber-users/login', data);
      // console.log(response.data.data.message)
      if (response.status === 200) {
        const responseData = response.data;
        // setUser(responseData.user);
        localStorage.setItem('token', responseData.token);
        navigate('/dashboard');
        console.log(response.data.message);
      }

    } catch (error) {
      if (error.response.status === 401) {
        setBackendError(error.response.data.message || 'Invalid email or password');
      }
      console.error('Login failed:', error);
    }
  };
  let passwordVisibilityHandler= ()=>{
    setPasswordVisible(!passwordVisible)
    }
  return (
    <div className='p-5 flex flex-col justify-between h-screen'>
      <div>
        <img src={Uber_logo} alt="" className="w-20 mb-8" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            type='email'
            placeholder="email@example.com"
            {...register('email')}
            className={`bg-[#eeeeee] mb-2 rounded px-4 py-2 border outline-none w-full text-lg placeholder:text-base ${errors.email
              ? 'border-red-500'
              : touchedFields.email
                ? 'border-green-500' // Green border if the field is touched and valid
                : ''
              }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>
          )}

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <div className={`flex items-center bg-[#eeeeee] mb-2  border rounded px-4 py-2 ${errors.password ? 'border-red-500' : touchedFields.password ? 'border-green-500'
              : ''}`}>
          <input
            type={passwordVisible ? 'text':'password'}
            placeholder='password'
            {...register('password')}
            autoComplete="current-password"
            className={` bg-transparent rounded outline-none border w-full text-lg placeholder:text-base`}
          />
              <span className='cursor-pointer text-md ' onClick={passwordVisibilityHandler}>{passwordVisible ? (<IoEye />) : (<FaEyeSlash />)}</span>

          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>
          )}

          <button className='text-center text-lg w-full bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2'>
            Login
          </button>
          {
            backendError && (
              <div className='bg-red-200 text-red-700 p-2 rounded-xl text-center font-medium'>{backendError}</div>
            )
          }
          <p className='text-center font-semibold'>
            New here?{' '}
            <Link className='text-blue-600' to='/signup'>
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to='/captain-login'>
          <button className='text-center text-lg w-full bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2'>
            Sign in as Captain
          </button>
        </Link>

      </div>
    </div>
  );
};

export default UserLogin;
