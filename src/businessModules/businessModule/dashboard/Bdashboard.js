import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import Navbar from '../../navbar/bnavbar';
import '../../businessModule.css';
import DisplayCampaign from './DisplayCampaign';

const Bdashboard = () => {
    const userID = useSelector((state) => state.authDetails.userID);
    const token = useSelector((state) => state.authDetails.token)
    const userType = useSelector((state) => state.authDetails.userType);

  return (
    <>
    {token.length > 1 && userID.length > 1 && userType === 'Business'  ? 
    <>
    <div className='Idashboard'>
      
        <Navbar children={<DisplayCampaign id={userID} token={token} type={userType}/>}/>
    </div>
    </>:<>
    <Navigate to="/" />
    </>}
    </>
  )
}

export default Bdashboard;