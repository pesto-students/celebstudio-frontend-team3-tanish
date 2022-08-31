import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../businessModule.css';
import axios from 'axios';
import {CgCalendarDates} from 'react-icons/cg';


const EditCampaign = () => {
  const [campList,setCampList] = useState([]);
  const [showCampaignDetails,setShowCampaignDetails] = useState('');
  const [fname, setFname] = useState("Jitender");
  const token= "grassIsGreener"
  const request = {
    method:'get',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:'https://celebackend.herokuapp.com/users/getallCampaigns',
  }

  const getDashboardData = async () => {
    let response2 = {};
    await axios(request)
    .then((res) => {response2= res.data.data.campaigns})
    .catch((err) => {console.log(err)});
    console.log(response2);
    setCampList(response2);
  }

    useEffect(() =>{getDashboardData()},[])
  
  const handleCampaignCardclick = ({tag}) => {
   if(showCampaignDetails.length === 0){
    setShowCampaignDetails(tag);
   }
   else{
    setShowCampaignDetails("")
   }

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
              <div className='campaignCard' key={items.id} title='Click to see complete detials' onClick={() => {handleCampaignCardclick({tag:items.id})}}>
                <div>{items.company}</div>
                <div className="campaignName">{items.name}</div>
                <div><CgCalendarDates/>{items.start} - <CgCalendarDates />{items.end}</div>
                {showCampaignDetails === items.id ? 
                  <div>
                    <div>Earning:{items.earning}</div>
                    <div>Campaign Description:{items.desc}</div>
                  </div> : null  
                }
              </div>
            ))}
            </div>
    </div>
  )
}

export default EditCampaign;