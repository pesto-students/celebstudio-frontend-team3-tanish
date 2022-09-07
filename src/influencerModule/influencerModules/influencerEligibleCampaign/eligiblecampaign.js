import React, { useEffect, useState } from 'react';
import '../../influencerModule.css';
import {CgCalendarDates} from 'react-icons/cg';
import { useSelector } from 'react-redux';
import axios from 'axios';

const EligibleCampaign = () => {
  const name = useSelector(state => state.authDetails.userData.first_name)
  const token = useSelector(state => state.authDetails.token)
  const userID = useSelector(state => state.authDetails.userID)

  const [showCampaignEnroll,setShowCampaignEnroll] = useState('');
  const [applyNote, setApplynote] = useState('');
  const [fname, setFname] = useState(name);
  const [eligibleCampaign, setEligibleCampaign] = useState([]);
  
  const getEligibleCampaign = {
    method:'get',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:`https://celebackend.herokuapp.com/api/v1/influencer/${userID}/eligible-campaigns/`,
    //"https://celebackend.herokuapp.com/api/v1/influencer/63176dd3d97cd4001698f329/eligible-campaign/"
  }

  useEffect(() => {
    let campaign = null;
    console.log(getEligibleCampaign)
    axios(getEligibleCampaign)
    .then(res => {campaign = res.data.data.campaign[0];
      setEligibleCampaign(campaign[0]);
      console.log(eligibleCampaign);
  })
    .catch(err => console.log(err));
    
  },[])
  
  const applyrequest = {
    method:'patch',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:`https://celebackend.herokuapp.com/api/v1/campaign/${showCampaignEnroll}/apply`,
    data:{
      influencer_id:userID,
      message:applyNote,
    }
  }

  const handleCampaignCardclick = ({tag}) => {
     setShowCampaignEnroll(tag);
   
   }

   const handleChange = (event) => {
    setApplynote(event.target.value);
   }

   const apply = (event) => {
      console.log(applyrequest);
      axios(applyrequest)
      .then(res => console.log(res))
      .catch(err => console.log(err));
   }

   const cancleApply = (event) => {
      setShowCampaignEnroll(null);
      console.log(showCampaignEnroll);
   }
 
   return (
     <div className='dashboardCampaign'>
         <div className='dashboardgreet'>
         <h1>Hey {fname},</h1> 
         </div>
         
         <div className='line'></div>
         <div className='campDesceli'> You are eligible for these campaign. </div>
         <div className={showCampaignEnroll ? "foreground" : "background"}>
                 {showCampaignEnroll ? 
                  <div className='EnrollCampaign'>
                      <h3>Apply Campaign</h3>
                      <h2>{eligibleCampaign.name}</h2>
                    <label>Message for the business</label>
                    <textarea rows={7} cols={50} onChange={handleChange} /><br/>
                    <div className="ApplicationButton">
                    <button className='update' onClick={() => {apply()}}>Apply</button> 
                    <button className='cancle' onClick={() =>{cancleApply()}}>Cancel</button>
                    </div>
                  </div>:null}
                 </div>
             
               <div className='campaignCard' key={eligibleCampaign._id} title='Click to apply' onClick={() => {handleCampaignCardclick({tag:eligibleCampaign._id})}}>
                 
                 <div className="campaignName">{eligibleCampaign.name}</div>
                 <div><CgCalendarDates/>{eligibleCampaign.start_date} - <CgCalendarDates />{eligibleCampaign.end_date}</div>
                 <div>Campaign Description:{eligibleCampaign.description}</div>
               </div>
          
             
     </div>
   )
}

export default EligibleCampaign;