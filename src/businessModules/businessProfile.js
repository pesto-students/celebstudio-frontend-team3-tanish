import React from 'react';
import { useSelector } from 'react-redux';
import bussImg from '../signup/influencer.PNG';

const BusinessProfile = () => {
  const userID = useSelector((state) => state.authDetails.userID);
  const userType = useSelector((state) => state.authDetails.userType);
  const status = useSelector((state) => state.authDetails.status);

 return(
  <>
    {userID != null && userType != null && status ? 
    <>
    Business
    </> : <>
    <div>Access denied!!! Please Login</div>
    <Signup />
    </>}
  </>
 )
}

export default BusinessProfile;