import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../influencerModule.css';
import axios from 'axios';
import {CgCalendarDates, CgFacebook} from 'react-icons/cg';
import { useSelector } from 'react-redux';


const AppliedCampaign = () => {
  const userID = useSelector(state => state.authDetails.userID)
  const name = useSelector(state => state.authDetails.userData.first_name)
  const token = useSelector(state => state.authDetails.userData.token)
  const [campList,setCampList] = useState([]);
  const [fname, setFname] = useState(name);
  



  const getDashboardData = async () => {
    const request = {
      method:'get',
      header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
      url:`https://celebackend.herokuapp.com/api/v1/influencer/${userID}/applied-campaigns`,
    }
    let response2 = {};
    await axios(request)
    .then((res) => {response2= res.data.data.campaigns
    })
    .catch((err) => {console.log(err)});
    console.log(response2);
    setCampList(response2);
  }

    useEffect(() =>{getDashboardData()},[])
 

  return (
    <>
   
    <div className='dashboardCampaign'>
        <div className='dashboardgreet'>
        <h1>Welcome {fname},</h1> 
    </div>
        <div className='line'></div>
        <div className='campaigncardConatiner'>
        <div className='campDesc'> Campaign waiting for approval from business </div>
            {campList.map((items) =>(
              <div className='campaignCard' key={items._id} title='Click to see complete detials'>
                <div>{items.business_id.company_name}</div>
                <div className="campaignName">{items.name}</div>
                <div><CgCalendarDates/>{items.start_date.slice(0,10)} - <CgCalendarDates />{items.end_date.slice(0,10)}</div>
               <div>Campaign Description:{items.description}</div>
              </div>
            ))}
            </div>
            </div>
    </>
  )
}

export default AppliedCampaign;