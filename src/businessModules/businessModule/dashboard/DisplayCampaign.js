import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../../businessModule.css';
import axios from 'axios';
import {CgCalendarDates} from 'react-icons/cg';
import {FaRupeeSign} from 'react-icons/fa';
import { useSelector } from 'react-redux';


const DisplayCampaign = (props) => {
  const userID = props.id;
  const token = props.token;
  const userName = useSelector(state => state.authDetails.userData.first_name)
  const navigate = useNavigate();
  const [campList,setCampList] = useState([]);
  let response = {};
  const [fname, setFname] = useState(userName);
  const request = {
    method:'get',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:`https://celebackend.herokuapp.com/api/v1/business/${userID}/campaigns`,
  }

  const getDashboardData = async () => {
   
    await axios(request)
    .then((res) => {
      console.log(res)
     response = res.data.data.campaign_info;
    })
    .catch((err) => {console.log(err)});
    console.log(response);
    setCampList(response);
  }

   useEffect(() =>{getDashboardData();},[])
    

  const handleShowCampaignDetails = ({tag}) => {
    let data = campList.filter(items => (items._id === tag ? items : null));
    navigate('showCamapign', {state:{data:{data}}})
  }

  return (
    <div className='dashboardCampaign'>
        <div className='dashboardgreet'>
        <h1>Welcome {fname},</h1>
        Edit your configured campaign here. 
        </div>
        <div className='line'></div>
        <div className='campaigncardConatiner'>
        <div className='campDesc'> Campaign List </div>
        {campList.length === 0 ?
        <div className='emptyCamplist'>
          <p>You haven't created any campaigns yet.
            <Link to='/newcampaign'>Click</Link> here to get started</p>
        </div>: null}
            {campList.map((items) => (
              <div className='campaignCard' key={items._id} title='Click to see complete detials' onClick={() => handleShowCampaignDetails({tag:items._id})}>
                <div className='objective'>{items.campaign_objective.toLocaleUpperCase()}</div>
                <div className="campaignName">{items.name} </div><br/>
                <span><CgCalendarDates/>{items.start_date.slice(0,10)} - <CgCalendarDates />{items.end_date.slice(0,10)}</span><span className={items.status === "pre-launched" ? "pre-launch":"launch"}>{items.status}</span>
                  <div className='budget'><FaRupeeSign size={18}/>{items.budget}/per influencer</div>
              </div>
            ))}
            </div>
    </div>
  )
}

export default DisplayCampaign;