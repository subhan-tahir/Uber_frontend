import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Private = ({children}) => {
     
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

 return (
    <>
    {children}
    </>
 )
};

export default Private;
