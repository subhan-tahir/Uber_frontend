import React, { useRef,useState,useEffect } from 'react'
import { IoMdExit } from "react-icons/io";
import { Link } from 'react-router-dom'
import Uber_logo from '../assets/uber-driver.svg';

import CaptainDetails from '../Components/CaptainDetails';
import RidePopUp from '../Components/RidePopUp';
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp';
import gsap from 'gsap';

const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(true);
    const [confirmPopupPanel, setConfirmPopupPanel] = useState(false);

    const ridePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
        //animate confirmedridepanel
        useEffect(() => {
            if (ridePopupPanel) {
              gsap.to(ridePanelRef.current, {
                translateY: '0',
                duration: 0.5,
                ease: 'power2.out',
              });
            } else {
              gsap.to(ridePanelRef.current, {
                translateY: '100%',
                duration: 0.5,
                ease: 'power2.in',
              });
            }
          }, [ridePopupPanel]);
        useEffect(() => {
            if (confirmPopupPanel) {
              gsap.to(confirmRidePanelRef.current, {
                translateY: '0',
                duration: 0.5,
                ease: 'power2.out',
              });
            } else {
              gsap.to(confirmRidePanelRef.current, {
                translateY: '100%',
                duration: 0.5,
                ease: 'power2.in',
              });
            }
          }, [confirmPopupPanel]);
    return (
        <div className='h-screen'>

            <div className='h-1/2 w-full relative'>
                <div className='flex justify-between items-center absolute top-0 w-full p-2'>
                    <div className=''><img src={Uber_logo} alt="" className='h-14 ' /></div>
                    <Link to='/dashboard' className=''><div className='  bg-white w-10 h-10 rounded-full flex items-center justify-center'>
                        <IoMdExit className='font-extrabold text-xl' />
                    </div></Link>
                </div>

                {/* image for temporary use */}
                <img className='w-full h-full object-cover' src="https://images.squarespace-cdn.com/content/v1/5a05f520f6576e6135323430/1570233092180-KY4SR5HLAZ42H8UF73IF/v3.png" alt="" />
            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />

            </div>

            {/*ride popup */}
            <RidePopUp ref={ridePanelRef} setRidePopupPanel={
                setRidePopupPanel} openConfirmPanel={setConfirmPopupPanel}/>
            {/*confirmridepopup */}
            <ConfirmRidePopUp ref={confirmRidePanelRef} closedConfirmPanel={setConfirmPopupPanel} />
        </div>

    )
}

export default CaptainHome