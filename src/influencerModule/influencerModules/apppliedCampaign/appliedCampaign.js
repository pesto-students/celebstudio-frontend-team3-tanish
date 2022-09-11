import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import AppliedCampaign from './apply';
import Navbar from '../../navbar/navbar';
import '../../influencerModule.css';

const   ShowAppliedCampaign = () => {
  const user = useSelector(state => state.authDetails.userData);
  console.log(user);
    const userID = useSelector((state) => state.authDetails.userID);
    const userType = useSelector((state) => state.authDetails.userType);
  return (
    <>
    {userID.length > 1 && userType === 'Influencer' ? 
    <>
    <div className='Idashboard'>
      
        <Navbar children={<AppliedCampaign />}/>
    </div>
    </>:<>
    <Navigate to="/" />
    </>}
    </>
  )
}

export default ShowAppliedCampaign;