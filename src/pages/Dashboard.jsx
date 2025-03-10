import React, { useState, useContext, useEffect, } from 'react';
import { AnimatePanelProvider } from '../context/AnimatePanelContext';
import Uber_logo from '../assets/Uber_logo.png';
import { RiArrowDownWideLine } from "react-icons/ri";
import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import ConfirmedRide from '../Components/ConfirmedRide';
import LookingDriverPanel from '../Components/LookingDriverPanel';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../Components/LiveTracking';
import EditProfileSidebar from '../Components/EditProfileSidebar';
import { InternetDisconnectivityContext } from '../context/InternetDisconnectPopupContext';


const Dashboard = () => {
  const navigator = useNavigate();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [searchType, setSearchType] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [fare, setFare] = useState('');
  const [userCharacter, setUserCharacter] = useState('');
  const [openAccountSidebar, setOpenAccountSidebar] = useState(false);
  const { setActivePanel, panelRefs, activePanel } = useContext(AnimatePanelProvider);
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL;

const isOnline = useContext(InternetDisconnectivityContext)

  const validationSchema = Yup.object().shape({
    pickup: Yup.string().required('Pick-up location is required'),
    destination: Yup.string().required('Destination is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const fetchSuggestions = async (query) => {
    console.log(query);
    try {
      const response = await axios.get(`${BASE_URL}/maps/get-suggestions?input=${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log('suggestion')
      setSuggestions(response.data);
    
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }
  };

  const handleSelectSuggestion = (location) => {
    if (searchType === "pickup") {
      setPickup(location);
      console.log(pickup);
    } else if (searchType === "destination") {
      setDestination(location);
    }
    setSuggestions([]);
  };

  const createride = async (vehicleType) => {
    try {
      await axios.post(`${BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } catch (error) {
      console.log('Error creating ride:', error);
    }
  };

  const onSubmit = async () => {
    setActivePanel("vehiclePanel");

    // if(activePanel === 'vehiclePanel'){
    //   activePanel(null)
    // }
    try {
      const response = await axios.get(`${BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFare(response.data);
    } catch (error) {
      console.error("Fare fetching error:", error.response?.data || error.message);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigator('/login', { replace: true });
  };

  const editProfileHandler = () => {
    setOpenAccountSidebar(true);
};

  useEffect(() => {

    const userFirstCHaracter = localStorage.getItem('userCharacter');
    setUserCharacter(userFirstCHaracter);
  }, [])
  return (
    <>
      <div className='relative h-screen overflow-hidden'>

        <div className='flex flex-col gap-5 absolute top-5 px-4 w-full'>
          <div className='flex items-center justify-between  w-full z-10 mt-10'>
            <img className='w-16' src={Uber_logo} alt="Uber Logo" />
            {/*profile button */}
           <button onClick={editProfileHandler}> <span className='bg-black text-white font-bold text-[25px] w-[45px] h-[45px] rounded-full flex items-center justify-center  '>{userCharacter}</span></button>
          </div>

          {openAccountSidebar && <EditProfileSidebar closedSidebar={()=>setOpenAccountSidebar(false)} userCharacter={userCharacter} isOpen={openAccountSidebar}/>} 


          {/*logout button */}
          <div className='flex flex-1 justify-end'>
            <button onClick={logoutHandler} className={`text-[27px] bg-white rounded-full h-[40px] w-[40px] flex items-center justify-center   ${!activePanel ? 'z-30' : ''}`}><MdLogout /></button>
          </div>

        </div>
        <div className='h-[60%] w-full relative'>
          <LiveTracking pickup={pickup} destination={destination}/>
        </div>
        <div className={`flex flex-col  absolute  w-full  ${activePanel === "topPanel" ? 'z-30 top-0 h-full' : '-z-1 bottom-0 h-[40%]'} ${activePanel === 'vehiclePanel' ? 'hidden' : ''}`}>
          <div className='p-3 bg-white relative'>
            <h4 className='text-3xl font-semibold flex items-center justify-between'>
              Find a trip
              <span className={`${activePanel ? 'opacity-1' : 'opacity-0'}`}>
                <RiArrowDownWideLine onClick={() => setActivePanel(null)} />
              </span>
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/*pickup field */}
              <input
              autoComplete='off'
                {...register('pickup')}
                onClick={() => { setSearchType('pickup'); setActivePanel("topPanel") }}
                value={pickup}
                onChange={(e) => { setPickup(e.target.value); fetchSuggestions(e.target.value); }}
                className={`outline-none bg-[#eee] px-12 py-2 text-base border-2 border-white rounded-lg w-full mt-5 ${errors.pickup && touchedFields.pickup ? '!border-red-500'
                  : ''} ${isOnline ? '' : 'opacity-50'}`}
                type="text"
                placeholder="Add a pick-up location"
                disabled={!isOnline}
              />
              {errors.pickup && (
                <p className="text-red-500 text-sm">{errors.pickup.message}</p>
              )}
              {/*destination field */}
              <input
               autoComplete='off'
                {...register('destination')}
                onClick={() => { setSearchType('destination'); setActivePanel("topPanel") }}
                value={destination}
                onChange={(e) => {setDestination(e.target.value); fetchSuggestions(e.target.value); }}
                className={`outline-none bg-[#eee] px-12 py-2 text-base border-white rounded-lg w-full border-2 mt-5 ${errors.destination && touchedFields.destination ? '!border-red-500' : ''} ${isOnline  ? '' : 'opacity-50'}`}
                type="text"
                placeholder="Enter your destination"
                disabled={!isOnline}
              />
              {errors.destination && (
                <p className="text-red-500 text-sm">{errors.destination.message}</p>
              )}
              <button className={`text-center text-lg w-full  mt-4 text-white font-semibold mb-2 rounded px-4 py-2 ${isOnline ? 'bg-black' : 'bg-gray-400 opacity-50 cursor-not-allowed'}`}
              disabled={!isOnline}
              >
                Find trip
              </button>
            </form>
          </div>
          <div className='bg-white h-0 overflow-y-auto' ref={panelRefs.topPanel}>
            <LocationSearchPanel
              setOpenVehiclePanel={() => setActivePanel("vehiclePanel")}
              locationPanel={() => setActivePanel(null)}
              suggestions={suggestions}
              onSelectSuggestion={handleSelectSuggestion}
            />
          </div>
        </div>

        {/* Panels */}
        <VehiclePanel
          ref={panelRefs.vehiclePanel}
          createride={createride}
          setSelectedVehicle={setSelectedVehicle}
          setConfirmedRidePanel={() => setActivePanel("confirmPanel")}
          fare={fare}
        />
        <ConfirmedRide
          ref={panelRefs.confirmPanel}
          setLookingPanel={() => setActivePanel("lookingPanel")}
          selectedVehicle={selectedVehicle}
          pickup={pickup}
          destination={destination}
          fare={fare}
        />
        <LookingDriverPanel
          ref={panelRefs.lookingPanel}
          closedLookingPanel={() => setActivePanel(null)}
          pickup={pickup}
          destination={destination}
          fare={fare}
          selectedVehicle={selectedVehicle}
        />
      </div>
    </>
  );
};

export default Dashboard;

