import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import Navbar from '../../navbar/navbar';
import Eligiblecampaign from './eligiblecampaign';

const Iprofile = () => {
  const userID = useSelector((state) => state.authDetails.userID);
  const userType = useSelector((state) => state.authDetails.userType);
  const status = useSelector((state) => state.authDetails.status);
return (
  <>
  {userID.length > 1 && userType === 'Influencer' ? 
    <>
    <div className='Idashboard'>
        <Navbar children={<Eligiblecampaign/>}/>
    </div>
    </>:<>
    <Navigate to="/signup" />
    </>}
    </>
  )
}

export default Iprofile;