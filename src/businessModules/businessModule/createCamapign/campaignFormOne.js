
import React, { useState } from 'react';
import '../../businessModule.css';
import info from '../../../img/info.png';
import axios from 'axios';

const CampaignFormOne = () => {
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTFiYTU4ODhmN2EzMjc5MGU5MjhkYyIsImlhdCI6MTY2MjEwNjU0MywiZXhwIjoxNjY5ODgyNTQzfQ.wRCoqH7TdIMH1YAQA6-xE10KWQtRcyP5tSB32ru5CIY";
  const [campaign, setCampaing] = useState({
    objective:String,
    nameCamp:String,
    campDesc:String,
    start:String,
    end:String,
    prodCatagoryPri:String,
    platform:String,
    budget:String,
    fcount:String,
  });

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
    console.log(campaign)
    axios(request)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  return (
    
<div className="CreateCampaing">
  <div className='CCleft'>
        <div className='CCobjective'>
          <h2>What's your objective?</h2>
            <button className={campaign.objective === "acquire" ? "campType opted" : "campType"} onClick={() => {setCampaing({...campaign, objective:'acquire'})}}>Acquiring customer</button>
            <button className={campaign.objective === "aware" ? "campType opted" : "campType"} onClick={() => {setCampaing({...campaign, objective:'aware'})}}>Brand Awareness</button>
            <div className='lineCC'></div>
            </div>
        <div className='CCname'>
              <h2> Campaign Name</h2><br/>
              <input type="text" name='nameCamp' value={campaign.value} onChange={setChange} placeholder="campaignName" />

                <h2>Campaign Description</h2><br/><textarea name='campDesc' rows={6} cols={50} value={campaign.value} onChange={setChange} placeholder="Campaign Desc" />
                <div className='lineCC'></div>
        </div>
        <div className='CCprodCat'>
           <h2>Product Catagory(Primary)</h2><br/><select name='prodCatagoryPri' value={campaign.value} onChange={setChange}>
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
              <h2>Start Date</h2><input type="date" name='start' value={campaign.value} onChange={setChange}/>
              <h2>End Date</h2><input type="date" name='end' value={campaign.value}   onChange={setEndDate} />
              <div className='lineCC'></div>
        </div>
        <div className='CCfcount'>
                <h2>Please Select a platform</h2><br/><select name='platform' value={campaign.value} onChange={setChange}>
                  <option value='1'>Facebook   </option>
                  <option value='2'>Instagram  </option>
                  <option value='3'>twitter    </option>
                </select>
              
                <h2> How many influnencer do you want for the campaign</h2>
                <input type="number" name="fcount" value={campaign.value} onChange={setChange} />
          
              <h2>What is your budget per influencer?</h2>
                <input type="text" name="budget" value={campaign.value} onChange={setChange}/>
              </div>
     
        <div className='buttonS'> <button className="campType" onClick={handleSubmit}>Create Campaign</button></div>
    </div>


    <div className='CCright'>
      <div className='CCrightContainer'>
        <img src={info} alt="information" /> 
    {campaign.objective.length === 1 ?
              <div>
                
                <p><b>Acquire Customer</b><br/>These campaigns are best suited for brands which has developed customers,
                And those who wish to increase there sales. Influnencer can be considered as affiliate who will help you increse your sales.
                <br/><br/><b>Brand Awareness</b><br/> These campaigns are best suited for brand who wish to develop customers. Create product awarenesss amongst 
                the targeted auidence of the user.

                </p>
              </div>:<div>
                {campaign.objective === "acquire" ? 
                  <div><b>Acquire Customer</b>Best for brands with developed audiance
                  
                  </div>:null}
                {campaign.objective === "aware" ? 
                  <div><b>Brand Awareness</b>Best for brands new to market.
                   
                  </div>:null}
                {campaign.nameCamp.length < 10 ?
                <p><b>Camapign Name</b>Please enter a name for your camapaig</p> : 
                <p><b>Camapign Name</b>Great name for your campaign</p>}
                {campaign.campDesc.length < 100 ?
                <p><b>Camapign Description</b>Write a short description for your campaign.
                  This will help influncers understand the objective clearly. you can shre your product link along with hashtag that you 
                  want for the camapign</p>:
                  <p><b>Camapign Description</b>
                    Amazing!! Your influencers will be delighted to see your product.
                  </p>
                }
                {campaign.prodCatagoryPri === 1 ? 
                <p><b>Primary Catagory</b>Select your product catagory</p>:<p><b>Primary Catagory</b>Celebstudio will match influencer who have primary product catagory set to the one you have selected.</p>}
                {campaign.prodCatagorySec === 1 ? 
                <p><b>Secondary Catagory</b>Select your product catagory</p>:<p><b>Secondary Catagory</b>Celebstudio will match influencer who have Secondary product catagory set to the one you have selected.</p>}
                {campaign.start === 1 ?
                <p><b>Start date</b> start date of your campaign</p>:<p><b>Start date</b>Your campaign will start from {campaign.start}.</p>}
                {campaign.end === 1 ?
                <p><b>End date</b>End date for your campaign</p>:<p><b>End date</b>Your campaign will start from {campaign.end}.</p>}
              
              </div>}
    </div>
    </div>



    </div>

  )
}

export default CampaignFormOne;