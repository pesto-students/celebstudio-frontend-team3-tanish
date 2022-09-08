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
  const [appliedStatus, setAppliedStatus] = useState(false);
  
  const getEligibleCampaign = {
    method:'get',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:`https://celebackend.herokuapp.com/api/v1/influencer/${userID}/eligible-campaigns/`,
  }

  const getEligibleCampaignList = async () => {
    let response2 = {};
    await axios(getEligibleCampaign)
    .then((res) => {response2 = res.data.data.campaign})
    .catch((err) => {console.log(err)});
    console.log(response2);
    setEligibleCampaign(response2);       //arry .map ; obj.item
  }

    useEffect(() =>{getEligibleCampaignList()},[])
  


  const handleCampaignCardclick = ({tag}) => {
     setShowCampaignEnroll(tag);
   
   }

   const handleChange = (event) => {
    setApplynote(event.target.value);
   }

   const applyrequest = {
    method:'patch',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:`https://celebackend.herokuapp.com/api/v1/campaign/${showCampaignEnroll}/apply`,
    data:{
      influencer_id:userID,
      message:applyNote,
    }
  }

   const apply = (event) => {
      axios(applyrequest)
      .then(res => {
        let applied = (res.data.data[0].influencers[0].applied);
       setAppliedStatus(applied);
        console.log(applied);
      })
      .catch(err => console.log(err));
   }

   const cancleApply = (event) => {
      setShowCampaignEnroll(null);
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
                  
                  {appliedStatus ? 

                  <div>
                        <b>You have applied for the campaing!!</b>
                      <div className='ApplyCloseButton'>
                        <button className='cancle' onClick={() =>{cancleApply()}}>Close</button>
                      </div>
                      </div>:
                    
                    <div>
                      <label>Message for the business</label><br/>
                      <textarea rows={10} cols={30} onChange={handleChange} />
                      <div className="ApplicationButton">
                      <button className='update' onClick={() => {apply()}}>Apply</button> 
                      <button className='cancle' onClick={() =>{cancleApply()}}>Cancel</button>
                      </div>
                    </div>
                  }
                    
                 </div> : null }
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