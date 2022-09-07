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
  const [eligibleCampaign,setEligibleCampaign] = useState([]);
  
  const getEligibleCampaign = {
    method:'get',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:`https://celebackend.herokuapp.com/api/v1/influencer/${userID}/eligible-campaigns/`,
  }

  const getEligibleCampaignList = async () => {
    let response2 = {};
    await axios(getEligibleCampaign)
    .then((res) => {response2= res.data.data.campaign})
    .catch((err) => {console.log(err)});
    console.log(response2);
    setEligibleCampaign(response2);
  }

    useEffect(() =>{getEligibleCampaignList()},[])
  
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
                      <h2>{eligibleCampaign.map(items => items._id === showCampaignEnroll ? items.name:null)}</h2>
                    <label>Message for the business</label>
                    <textarea rows={7} cols={50} onChange={handleChange} /><br/>
                    <div className="ApplicationButton">
                    <button className='update' onClick={() => {apply()}}>Apply</button> 
                    <button className='cancle' onClick={() =>{cancleApply()}}>Cancel</button>
                    </div>
                  </div>:null}
                 </div>
             {eligibleCampaign.map((items) =>(
               <div className='campaignCard' key={items._id} title='Click to apply' onClick={() => {handleCampaignCardclick({tag:items._id})}}>
                 <div>{items.business_id.company_name}</div>
                 <div className="campaignName">{items.name}</div>
                 <div><CgCalendarDates/>{items.start_date.slice(0,10)} - <CgCalendarDates />{items.end_date.slice(0,10)}</div>
                 <div>Campaign Description:{items.description}</div>
               </div>
             ))}
             
     </div>
   )
}

export default EligibleCampaign;