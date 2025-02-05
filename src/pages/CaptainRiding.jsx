import React, { useRef,useState,useEffect } from 'react'
import Uber_logo from '../assets/uber-driver.svg';
import { Link } from 'react-router-dom'
import { IoMdExit } from "react-icons/io";
import { RiArrowDownWideLine } from "react-icons/ri";
// import ConfirmRidePopUp from '../Components/ConfirmRidePopUp';
import FinishRide from '../Components/FinishRide';
import gsap from 'gsap'
const CaptainRiding = () => {
    const [finishPanel, setFinishPanel] = useState(false)
    const finishPanelRef = useRef(null);


         //animate confirmedridepanel
    useEffect(() => {
        if (finishPanel) {
          gsap.to(finishPanelRef.current, {
            translateY: '0',
            duration: 0.5,
            ease: 'power2.out',
          });
        } else {
          gsap.to(finishPanelRef.current, {
            translateY: '100%',
            duration: 0.5,
            ease: 'power2.in',
          });
        }
      }, [finishPanel]);

    return (
        <>

            <div className='h-screen relative'>

                {/* image for temporary use */}
                <img className='w-full h-full object-cover' src="https://images.squarespace-cdn.com/content/v1/5a05f520f6576e6135323430/1570233092180-KY4SR5HLAZ42H8UF73IF/v3.png" alt="" />
                    <div className='flex justify-between items-center absolute top-0 w-full p-2'>
                        <div className=''><img src={Uber_logo} alt="" className='h-14 ' /></div>
                        <Link to='/dashboard' className=''><div className='  bg-white w-10 h-10 rounded-full flex items-center justify-center'>
                            <IoMdExit className='font-extrabold text-xl' />
                        </div></Link>
                    </div>

                
            <div className='absolute bottom-0 w-full bg-yellow-500 min-h-[10rem]'>
                {/* <h2 className="flex justify-between items-center text-2xl font-semibold mb-5">Choose a Vehicle <span className='opacity-1 absolute left-[47%] top-1 text-gray-400 '><RiArrowDownWideLine onClick={()=>props.vehiclePanel(false)} className='text-2xl'/></span></h2> */}
                <span className='flex justify-center py-1 text-4xl'><RiArrowDownWideLine /></span>
                <div className='flex justify-center items-center py-3 px-5 '>
                    <h3 className='flex-1 font-semibold text-xl'>4 KM away</h3>
                    <button className='p-2 text-white bg-green-800 rounded-xl font-semibold text-[18px] flex-1 min-h-14' onClick={()=>setFinishPanel(true)}>Complete Ride</button>
                </div>
            </div>
            <FinishRide ref={finishPanelRef} />
            </div>
        </>
    )
}

export default CaptainRiding