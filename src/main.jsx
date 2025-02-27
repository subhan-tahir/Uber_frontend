import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material'; // Import MUI Loader
import './index.css';
import App from './App.jsx';
import InternetDisconnectPopupContext from './context/InternetDisconnectPopupContext.jsx';
import UserContext from './context/UserContext.jsx';

const RootComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return loading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress size={60} color={'black'}/>
    </Box>
  ) : (
    <InternetDisconnectPopupContext>
      <BrowserRouter>
        <UserContext>
          <App />
        </UserContext>
      </BrowserRouter>
    </InternetDisconnectPopupContext>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>
);
