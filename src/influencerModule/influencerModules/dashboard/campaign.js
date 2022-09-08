import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../influencerModule.css';
import axios from 'axios';
import {CgCalendarDates, CgFacebook} from 'react-icons/cg';
import { useSelector } from 'react-redux';


const Campaign = () => {
  const userID = useSelector(state => state.authDetails.userID)
  const name = useSelector(state => state.authDetails.userData.first_name)
  const facebook = useSelector(state => state.authDetails.userData.facebook.isactive);
  const instagram = useSelector(state => state.authDetails.userData.instagram.isactive);
  const twitter = useSelector(state => state.authDetails.userData.twitter.isactive);
  const [platform, setPlatform] = useState({
    facebook:facebook,
    instagram:instagram,
    twitter:twitter,
  });
  const [campList,setCampList] = useState([]);
  const [url,setUrl] = useState("");
  const [showCampaignDetails,setShowCampaignDetails] = useState('');
  const [fname, setFname] = useState(name);
  const token= "grassIsGreener";

  const request = {
    method:'get',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:`https://celebackend.herokuapp.com/api/v1/influencer/${userID}/campaigns`,
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

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const submitUrl = (event) => {
    console.log(url);
  }

  return (
    <>
   
    <div className='dashboardCampaign'>
        <div className='dashboardgreet'>
        <h1>Welcome {fname},</h1> 
        </div>
        
        <div className='performance' >
            <div>
              <div className='score'>12000</div>
              You earned
            </div>
            <div>
            <div className='score'>120</div>
              Post Share
              </div>
            <div >
            <div className='score'>20</div>
            Collaboration
            </div>
            <div >
            <div className='score'>3</div>
            Platform 
            </div>
        </div>
        <div className='line'></div>
        <div className='campaigncardConatiner'>
        <div className='campDesc'> Campaign List </div>
            {campList.map((items) =>(
              <div className='campaignCard' key={items._id} title='Click to see complete detials' onClick={() => {handleCampaignCardclick({tag:items._id})}}>
                <div>{items.business_id.company_name}</div>
                <div className="campaignName">{items.name}</div>
                <div><CgCalendarDates/>{items.start_date.slice(0,10)} - <CgCalendarDates />{items.end_date.slice(0,10)}</div>
                {showCampaignDetails === items._id ? 
                  <div>
                    <div>Earning:{items.budget}</div>
                    <div>Campaign Description:{items.description}</div>
                  </div> : null  
                }
              </div>
            ))}
            </div>
            </div>
  
    </>
  )
}

export default Campaign;