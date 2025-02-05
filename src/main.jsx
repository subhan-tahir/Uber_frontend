import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import ContextWrapper from '../../ContextWrapper.jsx'
import InternetDisconnectPopupContext from './context/InternetDisconnectPopupContext.jsx';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    
      <InternetDisconnectPopupContext>
      {/* <ContextWrapper> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </ContextWrapper> */}
      </InternetDisconnectPopupContext>
  </StrictMode>,
)