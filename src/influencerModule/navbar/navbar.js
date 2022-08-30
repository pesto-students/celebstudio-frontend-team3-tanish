import React, { Component, useState } from 'react';
import {ImMenu} from 'react-icons/im'; 
import './navbar.css';
import {AiFillHome} from 'react-icons/ai';
import {FaUserAlt} from 'react-icons/fa';
import {IoIosNotifications, IoIosLogOut} from 'react-icons/io';
import {SiCampaignmonitor} from 'react-icons/si';
import { logout } from '../../signup/authSlice';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';




const Navbar = ({children})  => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [showNav,setShowNav] = useState(false);


    const handleDasboardClick = (event) => {
      navigate('/Idashboard');
    }

    const handleSettingClick = (event) => {
      navigate('/Iprofile')
    }

    const handleCampaignClick = (event) => {
      navigate('/eligibleCampaign')
    }

    const handleINotification = (event) => {
      navigate('/Inotification')
    }

    const handleLogout = () => {
      dispatch(logout()); 
  }


    const handleMenu = (event) => {
        setShowNav(!showNav);
    }

    return (
      <div className='InfluencerContainer'>
          <div className='navbarIcon'>
            <div onClick={handleMenu}><ImMenu/></div>
            <div className='logo'>CelebStudio</div>
          </div>

          <div className='navbarContainer'>
            {showNav?
              <div className="navbaritems">
                <div className='navlist' name="hello"  onClick={handleDasboardClick}><AiFillHome/><div>Dashboard</div></div>
                <div className='navlist' name="hello" onClick={handleCampaignClick}><SiCampaignmonitor/><div>Campaign</div></div>
                <div className='navlist' name="hello" onClick={handleSettingClick}><FaUserAlt/><div>Profile</div></div>
                <div className='navlist' name="hello" onClick={handleINotification}><IoIosNotifications/><div>Notificaion</div></div>
                <div className='navlist' name="hello"onClick={handleLogout} ><IoIosLogOut/><div>Logout</div></div>
              </div>:null
            }
            <div className='IMcontainer'>
            {children} 
            </div>
          </div>
      </div>
    )
}

export default Navbar;