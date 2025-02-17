import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Uber_logo from '../assets/Uber_logo.png';
import axios from 'axios';
// import { UserDataContext } from '../context/UserContext';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { InternetDisconnectivityContext } from '../context/InternetDisconnectPopupContext';
import { CircularProgress } from '@mui/material';
const UserSignup = () => {
  // const { setUser } = useContext(UserDataContext);
  const isOnline = useContext(InternetDisconnectivityContext);

  const navigate = useNavigate();
  const [backendError, setBackendError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  // Validation schema using Yup
  const userSchema = Yup.object().shape({
    firstname: Yup.string().required('Username is required'),
    lastname: Yup.string().required('Last name is required'),
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
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data) => {
    const payload = {
      fullname: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      email: data.email,
      password: data.password,
    };
    console.log('Submitting data:', data);
    try {
      setLoader(true)
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/Uber-users/register`, payload);
      console.log('API Response:', response);
      if (response.status === 200 || response.status === 201) {
        navigate('/dashboard');
        const responseData = response.data;
        setUser(responseData.user);
        localStorage.setItem('token', responseData.token);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setBackendError(error.response.data.message || 'Email already exist');
      }
      console.error('Registration failed:', error.response?.data || error.message);

    }
    finally{
      setLoader(false);
    }
  };
  let passwordVisibilityHandler = () => {
    setPasswordVisible(!passwordVisible)
  }
  return (
    <div className="p-5 flex flex-col justify-between h-screen">
      <div>
        <img src={Uber_logo} alt="Uber Logo" className="w-20 mb-8" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-2 mb-1">
            <input
              type="text"
              placeholder="First name"
              {...register('firstname')}
              className={`bg-[#eeeeee] rounded outline-none px-4 py-2 border w-1/2 text-lg placeholder:text-sm ${errors.firstname ? 'border-red-500' : touchedFields.firstname ? 'border-green-500' : ''
                }`}
            />

            <input
              type="text"
              placeholder="Last name"
              {...register('lastname')}
              className={`bg-[#eeeeee] rounded px-4 outline-none py-2 border w-1/2 text-lg placeholder:text-sm ${errors.lastname ? 'border-red-500' : touchedFields.lastname ? 'border-green-500' : ''
                }`}
            />

          </div>
          {errors.firstname && (
            <p className="text-red-500 text-sm w-full block ">{errors.firstname.message}</p>
          )}
          <h3 className="text-lg font-medium my-2">What's your email</h3>
          <input
            type="email"
            placeholder="email@example.com"
            {...register('email')}
            className={`bg-[#eeeeee] mb-5 rounded px-4 outline-none py-2 border w-full text-lg placeholder:text-sm ${errors.email ? 'border-red-500' : touchedFields.email ? 'border-green-500' : ''
              }`}
          />
          {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>}

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <div className={`flex items-center bg-[#eeeeee] mb-2  border rounded px-4 py-2 ${errors.password ? 'border-red-500' : touchedFields.password ? 'border-green-500'
            : ''}`}>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder='password'
              {...register('password')}
              autoComplete="current-password"
              className={` bg-transparent rounded outline-none border w-full text-lg placeholder:text-base`}
            />
            <span className='cursor-pointer text-md ' onClick={passwordVisibilityHandler}>{passwordVisible ? (<IoEye />) : (<FaEyeSlash />)}</span>

          </div>
          {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>}

          <button className={`${isOnline || loader ? '' : 'cursor-not-allowed opacity-50 '} text-center text-lg w-full bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2`}
          disabled={loader || !isOnline}
          >
            {loader ? <CircularProgress size={24} color={'white'} /> : 'Create Account'}

          </button>
          <p className="text-center font-semibold">
            Already have an account?{' '}
            <Link className="text-blue-600" to="/login">
              Login here
            </Link>
          </p>
          {
            backendError && (
              <div className='bg-red-200 text-red-700 p-2 rounded-xl text-center font-medium'>&#128545; {backendError}</div>
            )
          }
        </form>
      </div>
      <div>
        <p className="text-[12px] text-gray-600 leading-tight">
          This site is protected by reCAPTCHA and the{' '}
          <span className="underline">Google Privacy Policy</span> and{' '}
          <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
