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
import LoadingSpinner from '../../../loader/loader';

const Show = (props) => {
    const camp=props.data;
    const token = useSelector(state => state.authDetails.token);
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState(camp);
    const [appliedInfluencer, setAppliedInfluencer] = useState([]);
    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const getInfluencerList = {
      method:'get',
      header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
      url:`https://celebackend.herokuapp.com/api/v1/campaign/${camp._id}/influencer-list`,
    }


  
    const getInfluencerData = async () => {
      console.log("entered getinfluencer request")
      setIsLoading(true)
      let response = null;
      await axios(getInfluencerList)
      .then((res) => {
        response = res.data.data.influencers;    
        console.log(response);
        setIsLoading(false);
      })
      .catch((err) => {console.log(err);
        setIsLoading(false)});

      setAppliedInfluencer(response); 
    }

    useEffect(() => {getInfluencerData();
    if(reload){
      setIsLoading(false)
      getInfluencerData();
      setReload(false);
    }
    },[])
    

    const handleDelete = (event) => {
      const deleteRequest = {
        method:'delete',
        header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
        url:`https://celebackend.herokuapp.com/api/v1/campaign/${campaign._id}`,
      }
      setIsLoading(true);
      axios(deleteRequest)
      .then(res => {setIsLoading(false);
        console.log(res);
        navigate('/bdashboard') 
      })
      .catch(err => {console.log(err)
      setIsLoading(false)});
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
      setIsLoading(true);
      let acceptData = {
        influencer_id:data,
        status:"accept",
      }
      const responseToApplication = {...acceptInfluencer, data:acceptData}
      console.log(responseToApplication)
      axios(responseToApplication)
      .then((res) => {setIsLoading(false);
        setReload(!reload);
      })
      .catch(err => {setIsLoading(false);console.log(err);
        })
    }

    const handleInfluencerReject = (data,event) => {
      setIsLoading(true)
      let rejectData = {
        influencer_id:data,
        status:"reject",
      }
      const responseToApplication = {...acceptInfluencer, data:rejectData}
      axios(responseToApplication)
      .then((res) => {getInfluencerData();
        setIsLoading(false)})
      .catch(err => {console.log(err);
      setIsLoading(false)})

    }


  

  return (
    <>
    {isLoading ? <LoadingSpinner /> : null}
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
                   {item.influencer.facebook ? <SiFacebook />  : null}
                   {item.influencer.instagram  ? <SiInstagram />  : null}
                   {item.influencer.twitter ? <SiTwitter />  : null}
                   </span> 
                 
                    <div><img src={follower} alt="followers" /> 
                    <span>
                    {item.influencer.instagram ? <>{item.influencer.instagram.follower_count}</> : null}
                    {item.influencer.facebook ?   <> {item.influencer.facebook.follower_count}</> : null}
                    {item.influencer.twitter ?   <> {item.influencer.twitter.follower_count}</> : null}
                    </span>
                    <span>
                    {item.influencer.instagram ? <> <FaRupeeSign />  {item.influencer.instagram.cost}</> : null}
                    {item.influencer.facebook ? <> <FaRupeeSign />  {item.influencer.facebook.cost}</> : null}
                    {item.influencer.twitter ? <> <FaRupeeSign />  {item.influencer.twitter.cost}</> : null}
                    </span>
                    </div>
                  {item.post_link.length > 1 ? 
                  <p><b> PostLink </b> {item.post_link}</p> :  
                  <div className='descandButton'>
                    <div className='infMsg'>
                      {item.message} 
                    </div>
                    <div>
                        {item.status === "accept" || item.status === 'reject'  ?
                          <div>
                            You have {item.status === 'accept' ? "accepted" : "rejected"} this profile.
                          </div> :
                        <div className='acceptButton'>
                          <button className='editButton update' onClick={() => {handleInfluencerAccept(item.influencer._id)}}>Accept</button>
                          <button className='editButton cancle' onClick={() => {handleInfluencerReject(item.influencer._id)}}>Reject</button>
                        </div>
                        }
                  </div>
                  </div>}
             
                </div>)}
            </div>    
    </div>
    </>
  )
}

export default Show;