import React, { useState, useEffect, createContext } from 'react';

// Create the context
export const InternetDisconnectivityContext = createContext();

const InternetDisconnectPopupContext = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <InternetDisconnectivityContext.Provider value={isOnline}>
      {children}
    </InternetDisconnectivityContext.Provider>
  );
};

export default InternetDisconnectPopupContext;
