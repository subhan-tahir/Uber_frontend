import React, { useContext } from 'react';
import Uber_logo from '../assets/Uber_logo.png';
import signalBg from '../assets/signal_traffic_bg.avif';
import { Link } from 'react-router-dom';
import { InternetDisconnectivityContext } from '../context/InternetDisconnectPopupContext';

const Home = () => {
  const isOnline = useContext(InternetDisconnectivityContext); 

  console.log("isOnline in home component:", isOnline);

  return (
    <>
      <div
        className="bg-cover bg-center h-screen pt-8 w-full bg-red-400 flex flex-col justify-between relative"
        style={{
          backgroundImage: `url(${signalBg})`,
        }}
      >
        <img src={Uber_logo} alt="Uber Logo" className="w-16 ml-8" />

        <div className="bg-white py-4 px-4 pb-7">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>

          {/* Disabled the button when offline */}
          <Link to={isOnline ? '/login' : '#'}>
            <button
              className={`w-full py-3 rounded mt-4 ${
                isOnline ? 'bg-black text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
              } font-semibold`}
              disabled={!isOnline} 
            >
              Continue
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
