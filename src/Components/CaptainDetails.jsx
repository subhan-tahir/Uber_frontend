import React from 'react'
import { MdAvTimer } from "react-icons/md";
import { IoSpeedometerOutline } from "react-icons/io5";
import { RiBookletLine } from "react-icons/ri";     

const CaptainDetails = () => {
  return (
    <>
     <div className='captain-detail'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        {/*driver-pic */}
                        <img src="https://img.freepik.com/premium-vector/limousine-driver-avatar_106788-330.jpg" alt="" className='w-12 h-12 object-cover rounded-full' />
                        {/*driver-name */}
                        <h4 className='text-lg font-semibold'>Shayan Khan</h4>
                    </div>
                    <div>
                        <h4  className='text-lg font-semibold'>Rs.300/-</h4>
                        <p  className='text-sm text-gray-500'>Earned</p>
                    </div>
                </div>
                <div className='bg-[#eee] p-2 rounded-lg flex justify-center gap-5 mt-4 w-full'>
                    <div className='flex flex-col items-center gap-1'>
                        <MdAvTimer className='text-2xl '/>
                        <h5  className='text-lg font-semibold'>10.2</h5>
                        <p className='text-sm text-gray-600'>hours Online</p>
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <IoSpeedometerOutline className='text-2xl '/>
                        <h5  className='text-lg font-semibold'>10.2</h5>
                        <p className='text-sm text-gray-600'>hours Online</p>
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <RiBookletLine className='text-2xl '/>
                        <h5  className='text-lg font-semibold'>10.2</h5>
                        <p className='text-sm text-gray-600'>hours Online</p>
                    </div>
                </div>
            </div>
    
    </>
  )
}

export default CaptainDetails