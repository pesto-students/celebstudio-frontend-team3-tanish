import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import Navbar from '../../navbar/bnavbar';
import Edit from './edit';
import {useLocation} from 'react-router-dom';

const EditCampaign= () => {
  const location = useLocation();
  console.log(location.state.data);
  let campDetails = location.state.data[0];
  const userID = useSelector((state) => state.authDetails.userID);
  const token = useSelector((state) => state.authDetails.token)
  const userType = useSelector((state) => state.authDetails.userType);

return (
  <>
  {token.length > 1 && userID.length > 1 && userType === 'Business'  ?
    <>
    <div className='Idashboard'>
        <Navbar children={<Edit data={campDetails}/>}/>
    </div>
    </>:<>
    <Navigate to="/signup" />
    </>}
    </>
  )
}

export default EditCampaign;