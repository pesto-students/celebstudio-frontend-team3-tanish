
import React, { useState } from 'react';
import '../../businessModule.css';
import info from '../../../img/info.png';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';


const Edit = (props) => {
    const navigate = useNavigate();
    const [successMsg, setsuccessMsg] = useState("");
    const token = useSelector(state => state.authDetails.token);
    const campDetails = props.data;
    const [campaign, setCampaing] = useState(campDetails);
    console.log(campaign);

  const request = {
    method:'patch',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:`https://celebackend.herokuapp.com/api/v1/campaign/${campaign._id}`,
    data: campaign,
  }
  
  const setChange = (event) => {
    const {name,value} = event.target;
    setCampaing({...campaign, [name]:value, });
    console.log(name,value, typeof(value));
  }

  const setEndDate = (event) => {
    const {name,value} = event.target;
    const start = campaign.start_date.split("-");
    const end = event.target.value.split("-");
    //if(start[0] > end[0] || start[1] > end[1] || start[2] > end[2]){
     // alert("End date should be greter then start date");
    //}
    //else{
      setCampaing({...campaign, [name]:value, });
    //}
    //
  }


  const handleSubmit = (event) => {
    axios(request)
    .then(res => {
      setsuccessMsg("success");
      navigate("/bdashboard")
    })
    .catch(err => {setsuccessMsg("failed")});
  }

  return (
    
<div className="CreateCampaing">
{successMsg === "success" ? 
  <div className='responseMsg success'>
    Campaign Creation successfull!!
  </div >: null}
  {successMsg === "responseMsg failed" ? <div className='failed'>
    Something went wrong. Please try again or contact customer care
  </div>: null}
  <div className='CCleft'>
        <div className='CCobjective'>
          <h2>What's your objective?</h2>
            <button className={campaign.campaign_objective === "acquiring" ? "campType opted" : "campType"} onClick={() => {setCampaing({...campaign, campaign_objective:"acquiring"})}}>Acquiring customer</button>
            <button className={campaign.campaign_objective === "awareness" ? "campType opted" : "campType"} onClick={() => {setCampaing({...campaign, campaign_objective:"awareness"})}}>Brand Awareness</button>
            <div className='lineCC'></div>
            </div>
        <div className='CCname'>
              <h2> Campaign Name</h2><br/>
              <input type="text" name='name' value={campaign.name} onChange={setChange} placeholder="campaignName" />

                <h2>Campaign Description</h2><br/><textarea name='description' rows={6} cols={50} value={campaign.description} onChange={setChange} placeholder="Campaign Desc" />
                <div className='lineCC'></div>
        </div>
    
        <div className='CCdata'>
              <h2>Start Date</h2><input type="date" name='start_date' value={campaign.start_date.slice(0,10)} onChange={setChange}/>
              <h2>End Date</h2><input type="date" name='end_date' value={campaign.end_date.slice(0,10)}   onChange={setEndDate} />
              <div className='lineCC'></div>
        </div>
     
        <div className='buttonS'> <button className="campType" onClick={handleSubmit}>Update Campaign</button></div>
    </div>


    <div className='CCright'>
      <div className='CCrightContainer'>
        <img src={info} alt="information" /> 
            Edit your campaign
    </div>
    </div>



    </div>

  )
}

export default Edit;