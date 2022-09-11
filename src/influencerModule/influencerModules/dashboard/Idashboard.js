import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import Campaign from './campaign';
import Navbar from '../../navbar/navbar';
import '../../influencerModule.css';

const Idashboard = () => {
  const user = useSelector(state => state.authDetails.userData);
  console.log(user);
    const userID = useSelector((state) => state.authDetails.userID);
    const userType = useSelector((state) => state.authDetails.userType);
    const status = useSelector((state) => state.authDetails.status);
  return (
    <>
    {userID.length > 1 && userType === 'Influencer' ? 
    <>
    <div className='Idashboard'>
      
        <Navbar children={<Campaign/>}/>
    </div>
    </>:<>
    <Navigate to="/" />
    </>}
    </>
  )
}

export default Idashboard;