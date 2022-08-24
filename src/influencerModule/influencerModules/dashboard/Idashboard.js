import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import Campaign from './campaign';
import Navbar from '../../navbar/navbar';
import '../../influencerModule.css';

const Idashboard = () => {
    const userID = useSelector((state) => state.authDetails.userID);
    const userType = useSelector((state) => state.authDetails.userType);
    const status = useSelector((state) => state.authDetails.status);
  return (
    <>
    {userID != null && userType != null && status ? 
    <>
    <div className='Idashboard'>
      
        <Navbar children={<Campaign/>}/>
    </div>
    </>:<>
    <Navigate to="/signup" />
    </>}
    </>
  )
}

export default Idashboard;