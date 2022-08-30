import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../influencerModule.css';
import {CgCalendarDates} from 'react-icons/cg'
const Campaign = () => {
  const [showCampaignDetails,setShowCampaignDetails] = useState('');
  const [fname, setFname] = useState("Jitender");



  const navigate = useNavigate();
  const campList = [{id:1234,company:"Kotak",name:'Amazon Fashion Week 2022-brand Endosment ',earning:"2000",desc:"just a description",objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:1200,name:'jitasdfghjkxcvbnm,xcvbnm,',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:1235,name:'jit',objective:'just post',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:1236,name:'jit',objective:'just post',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:2236,name:'jit',objective:'just post',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:3236,name:'jit',objective:'just post',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:44236,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:536,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:236,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:126,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:1736,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:1036,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:1239,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:1230,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:1247,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:1257,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'},
  {Icount:2,company:"kotak",earning:"2000",desc:"thisis just a demo, detials will be visible onClick",id:1267,name:'jit',objective:'acquire customer',start:'13-12-2020',end:'20-9-2022',status:'running'}]


  const handleCampaignCardclick = ({tag}) => {
   if(showCampaignDetails.length === 0){
    setShowCampaignDetails(tag);
   }
   else{
    setShowCampaignDetails("")
   }

  }

  return (
    <div className='dashboardCampaign'>
        <div className='dashboardgreet'>
        <h1>Welcome {fname},</h1> 
        </div>
        
        <div className='performance' >
            <div>
              <div className='score'>12000</div>
              You earned
            </div>
            <div>
            <div className='score'>120</div>
              Post Share
              </div>
            <div >
            <div className='score'>20</div>
            Collaborated with
            </div>
            <div >
            <div className='score'>3</div>
            Platform Activated
            </div>
        </div>
        <div className='line'></div>
        <div className='campaigncardConatiner'>
        <div className='campDesc'> Campaign List </div>
            {campList.map((items) =>(
              <div className='campaignCard' key={items.id} title='Click to see complete detials' onClick={() => {handleCampaignCardclick({tag:items.id})}}>
                <div>{items.company}</div>
                <div classname="campaignName">{items.name}</div>
                <div><CgCalendarDates/>{items.start} - <CgCalendarDates />{items.end}</div>
                {showCampaignDetails === items.id ? 
                  <div>
                    <div>Earning:{items.earning}</div>
                    <div>Campaign Description:{items.desc}</div>
                  </div> : null  
                }
              </div>
            ))}
            </div>
    </div>
  )
}

export default Campaign;