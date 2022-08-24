import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import './BP.css';
import { logout } from '../signup/authSlice';
import {ImMenu} from 'react-icons/im'; 
import {AiFillHome,AiFillSetting} from 'react-icons/ai';
import {IoIosNotifications, IoIosLogOut} from 'react-icons/io';
import {SiCampaignmonitor} from 'react-icons/si';
import {BsArrowRight} from 'react-icons/bs';
import axios from 'axios';
const Bprofile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const userID = useSelector((state) => state.authDetails.userID);
    const userType = useSelector((state) => state.authDetails.userType);
    const status = useSelector((state) => state.authDetails.status);
    const respose = useState({});
    const [profile, setprofile] = useState({
        fname:"",
        lname:"",
        cname:"",
        curl:"",
        email:"",
        password:"",
    });

    const handleMenu = (event) => {
        setShowNav(!showNav);
        console.log(showNav)
    }

    const handleFormDisplay = (event) => {
        setShowForm(!showForm);
    }

    const handleChange = (event) => {
        const {name,value} = event.target;
        setprofile({...profile,[name]:value});
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    const handleClick = (event) => {
        navigate(`/${[event.target.name]}`);
      }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios("url")
        .then((res) => {profile(res.json())})
        .catch((err) =>{console.log(err)});
      }
    

    return(
        <>
          {userID != null && userType != null && status ? 
          <>
          
            <div className='bProfile'>
              <div className='BDnav'>
                <div onClick={handleMenu}><ImMenu/></div>
                <div className='logo'>CelebStudio</div>
              </div>
      
      
              <div className='BPcontainer'>
                {showNav?
                  <div className="navbar">
                    <div className='navlist' name='Bdashboard' onClick={() => handleClick("dashbooard")}><AiFillHome/><div>Dashboard</div></div>
                    <div className='navlist' name='newcampaign' onClick={() => handleClick("campaign")}><SiCampaignmonitor/><div>Campaign</div></div>
                    <div className='navlist' name='bsetting' onClick={() => handleClick("setting")}><AiFillSetting/><div>Setting</div></div>
                    <div className='navlist' name='notification' onClick={() => handleClick("notification")}><IoIosNotifications/><div>Notificaion</div></div>
                    <div className='navlist'  onClick={handleLogout} ><IoIosLogOut/><div>Logout</div></div>
                  </div>:null
                }

                <div className='BPprofile'>
                    {showForm ? 
                    <>
                    <div className='formData'>
                    <div className='businessSignUp'>
    <form onSubmit={handleSubmit}>
      <div className="row">
    <div className="col-25">
      <label>First Name</label>
    </div>

    <div className="col-75">
      <input type="text" name="fname" className='bforminput' placeholder="Your name.."    value={profile.value} onChange={handleChange}/>
    </div>
  </div>

  <div className="row">
    <div className="col-25">
      <label >Last Name</label>
    </div>

    <div className="col-75">
      <input type="text" name="lname" className='bforminput' placeholder="Your last name.."    value={profile.value} onChange={handleChange}/>
    </div>
  </div>


  <div className="row">
    <div className="col-25">
      <label >Company Name</label>
    </div>

    <div className="col-75">
      <input type="text" name="cname" className='bforminput' placeholder="Company.."    value={profile.value} onChange={handleChange}/>
    </div>
  </div>

  <div className="row">
    <div className="col-25">
      <label >Company Url</label>
    </div>

    <div className="col-75">
      <input type="url" name="curl" className='bforminput' placeholder="company url.."    value={profile.value} onChange={handleChange} />
    </div>
  </div>

  <div className="row">
    <div className="col-25">
      <label > E-mail</label>
    </div>

    <div className="col-75">
      <input type="email" name="email" className='bforminput' placeholder="email.."    value={profile.value} onChange={handleChange} />
    </div>
  </div>

  <div className="row">
    <div className="col-25">
      <label >Password</label>
    </div>

    <div className="col-75">
      <input type="password" name="password" className='bforminput' placeholder="Your password.."    value={profile.value} onChange={handleChange} />
    </div>
  </div>

  
  <div className='buttonb'><button type='submit'>Continue <span className='arrowIcon'><BsArrowRight/></span></button></div>
  <div className='buttonb'><button onClick={handleFormDisplay}>Done</button></div>
  </form>
    </div>
                    </div>
                    </>:
                    <>
                    <div className='profileData'>
                        <h2>Profile Details</h2>
                        <div className='pdetails'>
                            <div>fname:{profile.fname}<br/>             </div>
                            <div>lname:{profile.lname}<br/></div>
                            <div>Company name:{profile.lname}<br/></div>
                            <div>company url:{profile.lname}<br/></div>
                            <div>email:{profile.lname}<br/></div>
                            <div className='edit' onClick={handleFormDisplay}>
                                Click here to edit your profile
                            </div>
                        </div>
                    </div>

                    </>}
                </div>
                </div>
              </div>
          
          </> : <>
          <Navigate to="/signup" />
          </>}
        </>
       )
}

export default Bprofile