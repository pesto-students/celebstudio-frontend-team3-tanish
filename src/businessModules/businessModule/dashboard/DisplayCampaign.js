import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../businessModule.css';
import axios from 'axios';
import {CgCalendarDates} from 'react-icons/cg';
import {FaRupeeSign} from 'react-icons/fa';


const DisplayCampaign = () => {
  const navigate = useNavigate();
  const [campList,setCampList] = useState([]);
  let response = {};
  const [showCompleteDetails, setCompleteDetails] = useState();
  const [fname, setFname] = useState("Jitender");
  const token= "grassIsGreener"
  const request = {
    method:'get',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:'https://celebackend.herokuapp.com/users/getallCampaigns',
  }

  const getDashboardData = async () => {
   
    await axios(request)
    .then((res) => {response= res.data.data.campaigns})
    .catch((err) => {console.log(err)});
    console.log(response);
    setCampList(response);
  }

    useEffect(() =>{getDashboardData();},[])
    
  const handleCampaignCardclick = ({tag}) => {
    let data = campList.filter(items => (items._id === tag ? items : null))
    navigate('editcampaign', {state:{data:{data}}})
  }

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
            {campList.map((items) =>(
              <div className='campaignCard' key={items._id} title='Click to see complete detials' onClick={() => handleShowCampaignDetails({tag:items._id})}>
                <div className='objective'>{items.campaign_objective.toLocaleUpperCase()}</div>
                <div className="campaignName">{items.name} </div><br/>
                <span><CgCalendarDates/>{items.start_date.slice(0,10)} - <CgCalendarDates />{items.end_date.slice(0,10)}</span><span className={items.status === "pre-launched" ? "pre-launch":"launch"}>{items.status}</span>
                <button className='buttonEdit' onClick={() => {handleCampaignCardclick({tag:items._id})}}>Edit Campaign</button>
                  <div className='budget'><FaRupeeSign size={18}/>{items.budget}/per influencer</div>
                 
              
              </div>
            ))}
            </div>
    </div>
  )
}

export default DisplayCampaign;