import React, { useEffect, useState } from 'react';
import '../../influencerModule.css';
import {CgCalendarDates} from 'react-icons/cg';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../loader/loader';

const EligibleCampaign = () => {
  const [isLoading, setIsLoading] = useState(false);
  const name = useSelector(state => state.authDetails.userData.first_name)
  const token = useSelector(state => state.authDetails.token)
  const userID = useSelector(state => state.authDetails.userID)
  const facebook = useSelector(state => state.authDetails.userData.facebook.isactive);
  const instagram = useSelector(state => state.authDetails.userData.instagram.isactive);
  const twitter = useSelector(state => state.authDetails.userData.twitter.isactive);
  const [platform, setPlatform] = useState({
    facebook:facebook,
    instagram:instagram,
    twitter:twitter,
  });

 


  const [showCampaignEnroll,setShowCampaignEnroll] = useState('');
  const [applyNote, setApplynote] = useState('');
  const [fname, setFname] = useState(name);
  const [eligibleCampaign,setEligibleCampaign] = useState([]);
  //apply status not working // have to use map but there is a mis match
  const [appliedStatus, setAppliedStatus] = useState(false);
  
  
  

  const getEligibleCampaignList = async () => {
    setIsLoading(true);
    const getEligibleCampaign = {
      method:'get',
      header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
      url:`https://celebackend.herokuapp.com/api/v1/influencer/${userID}/eligible-campaigns/`,
    }
    let response2 = {};
    await axios(getEligibleCampaign)
    .then((res) => {response2 = res.data.data.campaign;
    setIsLoading(false)})
    .catch((err) => {console.log(err);
    setIsLoading(false)});
    console.log(response2);
    setEligibleCampaign(response2);     
    let applied = (response2.map(item => item._id), response2.map(item => item.influencers.map(item => item._id == `${userID}` ? item.applied : "")))
    console.log(applied);
  }

   
  
  useEffect(() =>{getEligibleCampaignList()
    if(appliedStatus){
      getEligibleCampaignList()
    }},[appliedStatus]);

  const handleCampaignCardclick = ({tag}) => {
     setShowCampaignEnroll(tag);   
   }

   const handleChange = (event) => {
    setApplynote(event.target.value);
   }

   
   const apply = (event) => {
    setIsLoading(true);
    const applyrequest = {
      method:'patch',
      header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
      url:`https://celebackend.herokuapp.com/api/v1/campaign/${showCampaignEnroll}/apply`,
      data:{
        influencer_id:userID,
        message:applyNote,
      }
    }
  
      axios(applyrequest)
      .then(res => {
        setAppliedStatus(!appliedStatus);
        setAppliedStatus(true);
        getEligibleCampaignList();
        setIsLoading(false);
      })
      .catch(err => {console.log(err);
      setIsLoading(false)});
   }

   const cancleApply = (event) => {
      setShowCampaignEnroll(null);
      setAppliedStatus(false);
   }
 
   return (
    <>
    {isLoading ? <LoadingSpinner /> : null}
    {platform.facebook || platform.instagram || platform.twitter ?
  
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
                    <div > 
                    <div>You have applied for this campaign</div>
                    <div className='ApplicationButton'><button className='cancle' onClick={() =>{cancleApply()}}>Close</button></div>
                    </div>
                    :<div>
                      <label>Message for the business</label><br/>
                      <textarea className='ApplyText' rows={10} cols={70} onChange={handleChange} />
                      <div className="ApplicationButton">
                      <button className='update' onClick={() => {apply()}}>Apply</button> 
                      <button className='cancle' onClick={() =>{cancleApply()}}>Cancel</button>
                      </div>
                    </div>}
                
                    
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
     : 
     <div className='activateInfluencer'>
     <p>Your profile is not active yet.<br/>
       Please <Link to='/Iprofile'>Click</Link> here to set your social media platform.</p>
   </div>}
</>
   )
}

export default EligibleCampaign;