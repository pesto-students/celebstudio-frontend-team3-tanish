
import React, { useState } from 'react';
import '../../businessModule.css';
import info from '../../../img/info.png';
import axios from 'axios';
import { useNavigate } from 'react-router';


const Edit = (props) => {
    const navigate = useNavigate();
    const campDetails = props.data;
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTFiYTU4ODhmN2EzMjc5MGU5MjhkYyIsImlhdCI6MTY2MjEwNjU0MywiZXhwIjoxNjY5ODgyNTQzfQ.wRCoqH7TdIMH1YAQA6-xE10KWQtRcyP5tSB32ru5CIY";
  const [campaign, setCampaing] = useState(campDetails);

  const request = {
    method:'post',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:'https://celebackend.herokuapp.com/users/newCampaign',
    data: campaign,
  }
  
  const setChange = (event) => {
    const {name,value} = event.target;
    setCampaing({...campaign, [name]:value, });
    console.log(name,value, typeof(value));
  }

  const setEndDate = (event) => {
    const {name,value} = event.target;
    const start = campaign.start.split("-");
    const end = event.target.value.split("-");
    if(start[0] > end[0] || start[1] > end[1] || start[2] > end[2]){
      alert("End date should be greter then start date");
    }
    else{
      setCampaing({...campaign, [name]:value, });
    }
    
  }


  const handleSubmit = (event) => {
    axios(request)
    .then(navigate('/bdashboard'))
    .catch(navigate('/bdashboard'));
  }

  return (
    
<div className="CreateCampaing">
  <div className='CCleft'>
        <div className='CCobjective'>
          <h2>What's your objective?</h2>
            <button className={campaign.campaign_objective === "acquire" ? "campType opted" : "campType"} onClick={() => {setCampaing({...campaign, campaign_objective:'acquire'})}}>Acquiring customer</button>
            <button className={campaign.campaign_objective === "awareness" ? "campType opted" : "campType"} onClick={() => {setCampaing({...campaign, campaign_objective:'awareness'})}}>Brand Awareness</button>
            <div className='lineCC'></div>
            </div>
        <div className='CCname'>
              <h2> Campaign Name</h2><br/>
              <input type="text" name='name' value={campaign.name} onChange={setChange} placeholder="campaignName" />

                <h2>Campaign Description</h2><br/><textarea name='description' rows={6} cols={50} value={campaign.description} onChange={setChange} placeholder="Campaign Desc" />
                <div className='lineCC'></div>
        </div>
        <div className='CCprodCat'>
           <h2>Product Catagory(Primary)</h2><br/><select name='product_category' value={campaign.product_category} onChange={setChange}>
                <option value='1'>Fashion & Apparel     </option>
                <option value='2'>Food & Beverages     </option>
                <option value='3'>Health & Wellness       </option>
                <option value='4'> Pets         </option>
                <option value='5'>Beauty                  </option>
                <option value='6'>Jewellery & Accessories</option>
              </select>
              <div className='lineCC'></div>
        </div>
        <div className='CCdata'>
              <h2>Start Date</h2><input type="date" name='start_date' value={campaign.start_date.slice(0,10)} onChange={setChange}/>
              <h2>End Date</h2><input type="date" name='end_date' value={campaign.end_date.slice(0,10)}   onChange={setEndDate} />
              <div className='lineCC'></div>
        </div>
        <div className='CCfcount'>
                <h2>Please Select a platform</h2><br/><select name='platform' value={campaign.platform} onChange={setChange}>
                  <option value='1'>Facebook   </option>
                  <option value='2'>Instagram  </option>
                  <option value='3'>twitter    </option>
                </select>
              
                <h2> How many influnencer do you want for the campaign</h2>
                <input type="number" name="fcount" value={campaign.fcount} onChange={setChange} />
          
              <h2>What is your budget per influencer?</h2>
                <input type="text" name="budget" value={campaign.budget} onChange={setChange}/>
              </div>
     
        <div className='buttonS'> <button className="campType" onClick={handleSubmit}>Create Campaign</button></div>
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