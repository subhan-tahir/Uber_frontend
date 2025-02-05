import React,{useContext} from 'react';
import { InternetDisconnectivityContext } from '../context/InternetDisconnectPopupContext';

const InternetDisconnectPopup = () => {
    const isOnline = useContext(InternetDisconnectivityContext)
  return (
    <>
      {!isOnline && (
        <div className="bg-slate-300 rounded-lg p-2 w-[90%] left-[17px] absolute top-2 translate-y-3 duration-[1000]">
          <p className="text-md text-center text-gray-700 font-semibold">
            Please check your Internet connection.
          </p>
        </div>
      )}
    </>
  );
};

export default InternetDisconnectPopup;




