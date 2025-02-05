import React from 'react'
import uberCar from '../assets/uber-car1.png';
import { FaLocationDot } from "react-icons/fa6";
import { FaCashRegister } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import {Link} from 'react-router-dom'

const Riding = () => {
  return (
    <>

      <div className='h-screen'>

        <div className='h-1/2 w-full relative'>
        <Link to='/dashboard'><div className='absolute top-0 right-0 bg-white w-10 h-10 rounded-full m-2 flex items-center justify-center'>
        <IoHome />
        </div></Link>
          {/* image for temporary use */}
          <img className='w-full h-full object-cover' src="https://images.squarespace-cdn.com/content/v1/5a05f520f6576e6135323430/1570233092180-KY4SR5HLAZ42H8UF73IF/v3.png" alt="" />
        </div>
        <div className='h-1/2 p-4'>
          <div className='flex items-center justify-between'>
            <img src={uberCar} alt="" className='h-10'/>
            <div className='text-right flex-1'>
              <h2 className='text-lg font-medium'>Subhan</h2>
              <h4 className='text-xl font-semibold mb-1'>MV-1 - 2008 </h4>
              <p className='text-sm text-gray-600'> UberX,Alto</p>
            </div>
          </div>
          <div className='flex flex-col   gap-1 mb-5'>
            <div className='flex items-center gap-5 border-b-2 p-3'>
              <span className='text-xl'><FaLocationDot /></span>
              <div className=''>
                <h2 className='text-lg font-medium '>Block-A</h2>
                <p className='text-sm -mt-1 text-gray-600'>johar chorangi</p>
              </div>
            </div>
            <div className='flex items-center gap-5 border-b-2 p-3'>
              <span className='text-xl'><FaCashRegister /></span>
              <div>
                <h2 className='text-lg font-medium'>300 Rs./</h2>
                {/* <p className='text-sm -mt-1 text-gray-600'>johar chorangi</p> */}
              </div>

            </div>

          </div>
          <div><button 
            className='bg-green-600 text-white font-semibold px-2 py-[10px] text-xl rounded-xl w-full'>Make a Payment</button></div>
        </div>
      </div>

    </>
  )
}

export default Riding