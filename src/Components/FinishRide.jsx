import React from 'react'
import { RiArrowDownWideLine } from "react-icons/ri";
import { FaLocationDot } from 'react-icons/fa6';
import { RiMapPinUserFill } from "react-icons/ri";
import { FaCashRegister } from "react-icons/fa";
import { Link } from 'react-router-dom';
const FinishRide = React.forwardRef((props,ref) => {
  return (
    <>
    
    <div ref={ref} className='px-3 py-8 fixed bottom-0 w-full bg-white  translate-y-full'>
                <span className='opacity-1 absolute left-[47%] top-1 text-gray-400 ' onClick={()=>props.closedConfirmPanel(false)}><RiArrowDownWideLine className='text-2xl' /></span>
                <h3 className='text-2xl font-semibold my-5'>Finish this Ride</h3>
                <div className='flex items-center bg-yellow-400 rounded-lg mt-4 justify-between p-3'>
                    <div className='flex items-center gap-3'>
                        <img src="https://img.freepik.com/premium-vector/limousine-driver-avatar_106788-330.jpg" alt="" className='w-12 h-12 object-cover rounded-full' />
                        <h2 className='text-lg font-semibold'>Subhan Tahir</h2>
                    </div>
                    <h5>2.2 KM</h5>
                </div>
                <div className='flex flex-col   gap-1 '>
                    <div className='flex items-center gap-5 border-b-2 p-3'>
                        <span className='text-xl'><RiMapPinUserFill /></span>
                        <div className=''>
                            <h2 className='text-lg font-medium'>D-2/214</h2>
                            <p className='text-sm text-gray-600'>Saudabad Malir,Karachi</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 border-b-2 p-3'>
                        <span className='text-xl'><FaLocationDot /></span>
                        <div className=''>
                            <h2 className='text-lg font-medium '>Block-A</h2>
                            <p className='text-sm -mt-1 text-gray-600'>johar chorangi</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5  p-3'>
                        <span className='text-xl'><FaCashRegister /></span>
                        <div>
                            <h2 className='text-lg font-medium'>300 Rs./</h2>
                            <p className='text-sm -mt-1 text-gray-600'>johar chorangi</p>
                        </div>

                    </div>

                </div>
                <div className='px-3 mt-3'>
                  
                   <Link to='/captain-home'> <button className='mb-2 bg-green-500 text-white font-semibold px-2 py-[10px] text-xl rounded-xl w-full'>Finish Ride</button></Link>
                   
                   

                </div>
            </div >
    
    </>
  )
})

export default FinishRide