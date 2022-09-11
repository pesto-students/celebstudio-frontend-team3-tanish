import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../influencerModule.css';
import axios from 'axios';
import {CgCalendarDates} from 'react-icons/cg';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../../loader/loader';


const Campaign = () => {
  const userID = useSelector(state => state.authDetails.userID)
  const name = useSelector(state => state.authDetails.userData.first_name)
  const token = useSelector(state => state.authDetails.userData.token)
  const facebook = useSelector(state => state.authDetails.userData.facebook.isactive);
  const instagram = useSelector(state => state.authDetails.userData.instagram.isactive);
  const twitter = useSelector(state => state.authDetails.userData.twitter.isactive);
  const [showCampaignEnroll,setShowCampaignEnroll] = useState('');
  const [appliedStatus, setAppliedStatus] = useState();
  const [post_share, setPost_share] = useState("");
  const [collabs, setCollabs] = useState("");
  const [platformM, setPlatformM] = useState("");
  const [applyRes, setApplyRes] = useState(false)
  const [platform, setPlatform] = useState({
    facebook:facebook,
    instagram:instagram,
    twitter:twitter,
  });
  const [campList,setCampList] = useState([]);
  const [url,setUrl] = useState("");
  const [fname, setFname] = useState(name);
  const [isLoading, setIsLoading] = useState(false);
  



  const getDashboardData = async () => {
    setIsLoading(true);
    const request = {
      method:'get',
      header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
      url:`https://celebackend.herokuapp.com/api/v1/influencer/${userID}/campaigns`,
    }
    let response2 = {};
    let collabs = "";
    let post_share = "";
    let platform = "";

    await axios(request)
    .then((res) => {console.log(res);
      setIsLoading(false);
      setCollabs(res.data.data.collabs);
      setPost_share(res.data.data.post_share);
      setPlatformM(res.data.data.platform);
      response2 = res.data.data.campaigns;
    let postlink = response2.map(item => ({id:item._id, status:item.influencers.map(item => item.post_link)}))
    console.log(postlink);
    setAppliedStatus(postlink);
    console.log(postlink,collabs,post_share,platform);
    
    })
    .catch((err) => {console.log(err); setIsLoading(false);});
    setCampList(response2);
    console.log(response2)
  }

    useEffect(() =>{getDashboardData()},[])
  
  const handleCampaignCardclick = ({tag}) => {
    setShowCampaignEnroll(tag);
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

 
  const apply = (event) => {
    setIsLoading(true);
    const applyrequest = {
      method:'post',
      header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
      url:`https://celebackend.herokuapp.com/api/v1/influencer/${userID}/post-link/`,
      data:{
        campaign_id:showCampaignEnroll,
        post_link:url,
      }
    }

    console.log(applyrequest);
  
    axios(applyrequest)
    .then(res => {
      console.log(res);
      getDashboardData();
      setApplyRes(!applyRes);
      setIsLoading(false);
    })
    .catch(err => {console.log(err);
    setIsLoading(false)});
 
 }

  const cancleApply = (event) => {
    setShowCampaignEnroll(null);
 }

  return (
    <>
    {isLoading ? <LoadingSpinner /> : null}
    {platform.facebook || platform.instagram || platform.twitter ?
    <div className='dashboardCampaign'>
        <div className='dashboardgreet'>
        <h1>Welcome {fname},</h1> 
        </div>
        <div className={showCampaignEnroll ? "foreground" : "background"}>
                 {showCampaignEnroll ? 
                  <div className='EnrollCampaign'>
                      <h3>Apply Campaign</h3>
                      <h2>{campList.map(items => items._id === showCampaignEnroll ? items.name:null)}</h2>
                  {applyRes ? 
                  <p>Upload link successful</p> : null}
                  {appliedStatus.map(item => item.id === showCampaignEnroll ? 
                      item.status.map(item => item.length !== 0   ?

                  <div>
                        <b>You have uploaded the post link</b>
                      <div className='ApplyCloseButton'>
                        <button className='cancle' onClick={() =>{cancleApply()}}>Close</button>
                      </div>
                      </div>:
                    
                    <div>
                      <label>URL</label><br/>
                      <input type='text' onChange={handleUrlChange} />
                      <div className="ApplicationButton">
                      <button className='update' onClick={() => {apply()}}>Apply</button> 
                      <button className='cancle' onClick={() =>{cancleApply()}}>Cancel</button>
                      </div>
                    </div>)
                    :null)}

                    
                 </div> : null }
                 </div>
        
        <div className='performance' >
            <div>
              <div className='score'>0</div>
              You earned
            </div>
            <div>
            <div className='score'>{post_share}</div>
              Post Share
              </div>
            <div >
            <div className='score'>{collabs}</div>
            Collaboration
            </div>
            <div >
            <div className='score'>{platformM}</div>
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
               
                  <div>
                    <div>Earning:{items.influencers.map(items => items.cost )}</div>
                    <div>Campaign Description:{items.description}</div>
                  </div> 
      
              </div>
            ))}
            </div>
            </div> : 
            <div className='activateInfluencer'>
            <p>Your profile is not active yet.<br/>
              Please <Link to='/Iprofile'>Click</Link> here to set your social media platform.</p>
          </div>
           }
      
  
   
   
    </>
  )
}

export default Campaign;