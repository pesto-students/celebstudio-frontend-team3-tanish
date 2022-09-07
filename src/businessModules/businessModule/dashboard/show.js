import { getTransitionName } from 'antd/lib/_util/motion';
import React, { useEffect, useState } from 'react';
import {CgCalendarDates} from 'react-icons/cg';
import {FaRupeeSign} from 'react-icons/fa';
import { SiJitsi } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import pIMG from '../../../img/profileimg.PNG';
import { SiFacebook } from 'react-icons/si';
import { SiInstagram } from 'react-icons/si';
import { SiTwitter } from 'react-icons/si';
import follower from '../../../img/followerIcon.jpg';
import '../../businessModule.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Show = (props) => {
    const camp=props.data;
    const token = useSelector(state => state.authDetails.token);
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState(camp);
    const [appliedInfluencer, setAppliedInfluencer] = useState([]);

    const getInfluencerList = {
      method:'get',
      header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
      url:`https://celebackend.herokuapp.com/api/v1/campaign/${camp._id}/influencer-list`,
    }


    const getInfluencerData = async () => {
      let response = null;
      await axios(getInfluencerList)
      .then((res) => {
        console.log(res.data.data.influencers);
        response = res.data.data.influencers;
       
      })
      .catch((err) => {console.log(err)});
      console.log(response);
      setAppliedInfluencer(response)
      console.log(appliedInfluencer);
    }

 

    useEffect(() => {getInfluencerData()},[])
    

    const deleteRequest = {
      method:'delete',
      header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
      url:`https://celebackend.herokuapp.com/api/v1/campaign/${campaign._id}`,
    }


    const handleDelete = (event) => {
      axios(deleteRequest)
      .then(res => {console.log(res);
        navigate('/bdashboard') })
      .catch(err => console.log(err));

    }

    const handleCampaignCardclick = () => {
      navigate('editcampaign', {state:{data:[camp]}})
    }

    const acceptInfluencer = {
      method:'post',
      header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
      url:` https://celebackend.herokuapp.com/api/v1/campaign/${camp._id}/select-influencer`,
    }

    const handleInfluencerAccept = (data) => {
      let acceptData = {
        influencer_id:data,
        status:"accept",
      }
      const responseToApplication = {...acceptInfluencer, data:acceptData}
      console.log(responseToApplication)
      axios(responseToApplication)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }

    const handleInfluencerReject = (data) => {
      let rejectData = {
        influencer_id:data,
        status:"reject",
      }
      const responseToApplication = {...acceptInfluencer, data:rejectData}
      axios(responseToApplication)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    }


  

  return (
    <div className='showCampaign'>
     
             <div className='showCampaignCard'>
              <div>
                <div className='objective'><span> {campaign.campaign_objective.toLocaleUpperCase()}</span>
                <span><button onClick={() => handleCampaignCardclick()}>Edit</button><button onClick={() => {handleDelete()}}>Delete</button></span></div>
                <div className="ShowcampaignName">{campaign.name} </div><br/>
                <span><CgCalendarDates/>{campaign.start_date.slice(0,10)} - <CgCalendarDates />{campaign.end_date.slice(0,10)}</span> <span className={campaign.status === "pre-launched" ? "pre-launch":"launch"}>{campaign.status}</span>
                  <div className='budget'><FaRupeeSign size={18}/>{campaign.budget}/per influencer</div>
                  <div className='showDesc'>{campaign.description}</div>
              </div>
            </div>

            <h2>HandRaiser</h2>
            <div className="icontent">
              {appliedInfluencer.length === 0 ?
              <div className='emptyCamplist'>
              <p>We will notify you when influencers request to be a part of your campaign.</p>
            </div>:null}
            {appliedInfluencer.map(item =>
                <div className='influencerEntry' key={item.influencer._id}>
                 <div className='showIMG'>
                  {
                    item.img ? item.img : <img src={pIMG} alt="profile"/>
                  }
                </div>   
                 <div className='showName'>{item.influencer.first_name}</div>   
                 <div className='lineeli'></div>
                 <span className='showPlatform'>
                   {item.facebook ? <SiFacebook />  : null}
                   {item.instagram  ? <SiInstagram />  : null}
                   {item.twitter ? <SiTwitter />  : null}</span> 
                 
                    <span><img src={follower} alt="followers" /> 
                    {item.facebook ? item.facebook.follower_count : null}
                    {item.instagram ? item.instagram.follower_count : null}
                    {item.twitter ? item.twitter.follower_count : null}
                     <FaRupeeSign /> {item.facebook ? item.facebook.cost : null}
                     <FaRupeeSign /> {item.instagram ? item.instagram.cost : null}
                     <FaRupeeSign />  {item.twitter ? item.twitter.cost : null}
                     </span>   
                 <div className='infMsg'>{item.message}</div>
                <span><button className='editButton update' onClick={() => {handleInfluencerAccept(item.influencer._id)}}>Accept</button><button className='editButton cancle' onClick={() => {handleInfluencerReject(item.influencer._id)}}>Reject</button></span>
                </div>)}
            </div>


            
    </div>
  )
}

export default Show;