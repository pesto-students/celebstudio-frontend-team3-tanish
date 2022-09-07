import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import Navbar from '../../navbar/bnavbar';
import {useLocation} from 'react-router-dom';
import Show from './show';

const ShowCampaign= () => {
  const location = useLocation();
  let campDetails = location.state.data.data[0];

  const userID = useSelector((state) => state.authDetails.userID);
    const token = useSelector((state) => state.authDetails.token)
    const userType = useSelector((state) => state.authDetails.userType);
  return (
    <>
        {token.length > 1 && userID.length > 1 && userType === 'Business'? 
    <>
    <div className='Idashboard'>
        <Navbar children={<Show data={campDetails}/>}/>
    </div>
    </>:<>
    <Navigate to="/signup" />
    </>}
    </>
  )
}

export default ShowCampaign;