import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import './CV.css';
import { logout } from '../signup/authSlice';
import {ImMenu} from 'react-icons/im'; 
import {AiFillHome,AiFillSetting} from 'react-icons/ai';
import {IoIosNotifications, IoIosLogOut} from 'react-icons/io';
import {SiCampaignmonitor} from 'react-icons/si';
import axios from 'axios';

const CreateCampaign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const userID = useSelector((state) => state.authDetails.userID);
  const userType = useSelector((state) => state.authDetails.userType);
  const status = useSelector((state) => state.authDetails.status);
  const respose = useState({});
  const [campData1, setCampData1] = useState({
    campType:"",
    CampaignName:"",
    CampaignDesc:"",
    start:"",
    end:"",
    budget:"",

  });

  const request = {
    method:'post',
    header:'application/json',
    url:'http://localhost:8000/createCampaign/campData',
    data: campData1,
  }
 
  const handleMenu = (event) => {
    setShowNav(!showNav);
    console.log(showNav)
  }

  const handleClick = (event) => {
    navigate(`/${[event.target.name]}`);
  }

  const handleChange = (event) => {
    const {name,value} = event.target;
    setCampData1({...campData1,[name]:value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios(request)
    .then((res) => {setCampData1(res.json())})
    .catch((err) =>{console.log(err)});
  }

  const handleLogout = () => {
    dispatch(logout());
  }

 return(
  <>
    {userID != null && userType != null && status ? 
    <>
    
      <div className='createcampaign'>
        <div className='BDnav'>
          <div onClick={handleMenu}><ImMenu/></div>
          <div className='logo'>CelebStudio</div>
        </div>


        <div className='CCcontainer'>
          {showNav?
            <div className="navbar">
              <div className='navlist' name='Bdashboard' onClick={() => handleClick("dashbooard")}><AiFillHome/><div>Dashboard</div></div>
              <div className='navlist' name='newcampaign' onClick={() => handleClick("campaign")}><SiCampaignmonitor/><div>Campaign</div></div>
              <div className='navlist' name='bsetting' onClick={() => handleClick("setting")}><AiFillSetting/><div>Setting</div></div>
              <div className='navlist' name='notification' onClick={() => handleClick("notification")}><IoIosNotifications/><div>Notificaion</div></div>
              <div className='navlist'  onClick={handleLogout} ><IoIosLogOut/><div>Logout</div></div>
            </div>:null
          }


          <div className='createCamp'>
            <h2>Create campaign</h2>
          
                <form clasNamme='campaign'onSubmit={handleSubmit}>
                <label>Campaign Type</label>
                <select value={campData1.value} name="CampaignType" onChange={handleChange}>
                    <option value="acquire">Aquire customer</option>
                    <option value="post">Just post</option>
                </select><br/>

                <label>Campaign Name</label>
                <input type="text" className='bforminput' name="campName" value={campData1.value} onChange={handleChange} /><br/>
                <label>Campaign Description</label>
                <input type="textarea" className='bforminput' name="campDesc" value={campData1.value} onChange={handleChange} /><br/>
                <label>Budget</label>
          <input type="number" className='bforminput' name="budget" value={campData1.value} onChange={handleChange} /><br/>
                <label>Influencer count</label>
          <input type="number" className='bforminput' name="icount" value={campData1.value} onChange={handleChange} /><br/>
                <label>Start</label>
          <input type="date" className='bforminput' name="start" value={campData1.value} onChange={handleChange} /><br/>
                <label>End</label>
          <input type="date" className='bforminput' name="end" value={campData1.value} onChange={handleChange} /><br/>
          <div className='buttonC'><button type='submit'>Submit</button></div>
            </form>
            </div>
          </div>
        </div>
    
    </> : <>
    <Navigate to="/signup" />
    </>}
  </>
 )
}

export default CreateCampaign;