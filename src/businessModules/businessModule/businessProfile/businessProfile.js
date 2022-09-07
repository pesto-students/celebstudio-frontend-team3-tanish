import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import Navbar from '../../navbar/bnavbar';
import Bprofile from './bprofile';

const BusinessProfile = () => {
  const userID = useSelector((state) => state.authDetails.userID);
  const token = useSelector((state) => state.authDetails.token)
  const userType = useSelector((state) => state.authDetails.userType);

return (
  <>
  {token.length > 1 && userID.length > 1 && userType === 'Business'   ? 
    <>
    <div className='Idashboard'>
        <Navbar children={<Bprofile />}/>
    </div>
    </>:<>
    <Navigate to="/signup" />
    </>}
    </>
  )
}

export default BusinessProfile;