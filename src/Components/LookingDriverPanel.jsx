import React, { useContext } from 'react'
import { RiArrowDownWideLine } from "react-icons/ri";
import { FaLocationDot } from 'react-icons/fa6';
import { RiMapPinUserFill } from "react-icons/ri";
import { FaCashRegister } from "react-icons/fa";
import { AnimatePanelProvider } from '../context/AnimatePanelContext';

const LookingDriverPanel = React.forwardRef(({ pickup, destination, selectedVehicle, closedLookingPanel, fare = {} }, ref) => {
    const {setActivePanel} = useContext(AnimatePanelProvider)
    const formattedFare = (amount) => amount ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR' }).format(amount) : "N/A";
        
    return (
        <>
            <div className='z- fixed left-0 bottom-0 z-50 bg-white px-3 py-8 w-full flex flex-col gap-4 ' ref={ref}>
                <h2 className="flex justify-between items-center text-2xl font-semibold mb-5">Looking for a Driver<span className='opacity-1 absolute left-[47%] top-1 text-gray-400 '><RiArrowDownWideLine onClick={() => setActivePanel(false)} className='text-2xl' /></span></h2>
                <div className='flex justify-center items-center  max-w-[300px] m-auto'> <img src={selectedVehicle?.ride} alt="" className='h-24 w-full' /></div>
                <div className='flex flex-col   gap-1 '>
                    <div className='flex items-center gap-5 border-b-2 p-3'>
                        <span className='text-xl'><RiMapPinUserFill /></span>
                        <div className=''>
                            {/* <h2 className='text-lg font-medium'>D-2/214</h2> */}
                            <p className='text-sm text-gray-600'>{pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 border-b-2 p-3'>
                        <span className='text-xl'><FaLocationDot /></span>
                        <div className=''>
                            {/* <h2 className='text-lg font-medium '>Block-A</h2> */}
                            <p className='text-sm -mt-1 text-gray-600'>{destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 border-b-2 p-3'>
                        <span className='text-xl'><FaCashRegister /></span>
                        <div>
                            <h2 className='text-lg font-medium'>{formattedFare(fare[selectedVehicle?.name])}</h2>
                            <p className='text-sm -mt-1 text-gray-600'>{destination}</p>
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
})

export default LookingDriverPanel