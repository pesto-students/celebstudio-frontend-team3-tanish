import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import {useNavigate} from 'react-router-dom';
import './BD.css';
import { logout } from '../signup/authSlice';
import {ImMenu} from 'react-icons/im'; 
import {AiFillHome,AiFillSetting} from 'react-icons/ai';
import {IoIosNotifications, IoIosLogOut} from 'react-icons/io';
import {SiCampaignmonitor} from 'react-icons/si';

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNav, setShowNav] = useState(false);
  const userID = useSelector((state) => state.authDetails.userID);
  const userType = useSelector((state) => state.authDetails.userType);
  const status = useSelector((state) => state.authDetails.status);
  const campList = [{id:1234,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:1234,name:'jitasdfghjkxcvbnm,xcvbnm,',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:1235,name:'jit',objective:'just post',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:1236,name:'jit',objective:'just post',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:2236,name:'jit',objective:'just post',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:3236,name:'jit',objective:'just post',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:44236,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:536,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:236,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:126,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:1736,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:1036,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:1239,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:1230,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:1247,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:1257,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,id:1267,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'}]

  const handleMenu = (event) => {
    setShowNav(!showNav);
    console.log(showNav)
  }


  //correct this
  const handlerClick = (event) => {
    console.log(event.target.name);
  }
  const handleLogout = () => {
    dispatch(logout());
  }

 

 return(
  <>
    {userID != null && userType != null && status ? 
    <>
    
      <div className='bDashboard'>
        <div className='BDnav'>
          <div onClick={handleMenu}><ImMenu/></div>
          <div className='logo'>CelebStudio</div>
        </div>

        <div className='BDcontainer'>
          {showNav?
            <div className="navbar">
              <div className='navlist' name="Bdashboard" onClick={handlerClick}><AiFillHome/><div>Dashboard</div></div>
              <div className='navlist' name="newcampaign" onClick={handlerClick}><SiCampaignmonitor/><div>Campaign</div></div>
              <div className='navlist' name="setting" onClick={handlerClick}><AiFillSetting/><div>Setting</div></div>
              <div className='navlist' name="notification" onClick={handlerClick}><IoIosNotifications/><div>Notificaion</div></div>
              <div className='navlist' onClick={handleLogout} ><IoIosLogOut/><div>Logout</div></div>
            </div>:null
          }
          <div className='BDCcampaign'>
          <h1>Campaigns List</h1>
            {campList.map((items) =>(
              <div className='disCAMP' key={items.id}>
                <div>Name:{items.name      }</div>
                <div>Objective:{items.objective}</div>
                <div>Staus:{items.status    }</div>
                <div>Start:{items.start     }</div>
                <div>End:{items.end       }</div>
                <div>Icount:{items.Icount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </> : <>
    <Navigate to="/signup" />
    </>}
  </>
 )
}

export default BusinessDashboard;