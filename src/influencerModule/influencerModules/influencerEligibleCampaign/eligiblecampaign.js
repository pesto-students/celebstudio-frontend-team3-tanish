import React, { useState } from 'react';
import '../../influencerModule.css';
import {CgCalendarDates} from 'react-icons/cg';

const EligibleCampaign = () => {

  const [showCampaignEnroll,setShowCampaignEnroll] = useState('');
  const [applyNote, setApplynote] = useState('');
  const [fname, setFname] = useState("Jitender");
  const [submitSucess, setSubmitSuccess] = useState();
  const [showSuccessMsg, setShowSuccessmessage] = useState(false);
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
     setShowCampaignEnroll(tag);
   
   }

   const handleChange = (event) => {
    setApplynote(event.target.value);
   }

   const apply = (event) => {
    if(submitSucess == null){
      setSubmitSuccess()
    }
   }

   const cancleApply = (event) => {
      setShowCampaignEnroll("");
   }
 
   return (
     <div className='dashboardCampaign'>
         <div className='dashboardgreet'>
         <h1>Hey {fname},</h1> 
         </div>
         
         <div className='line'></div>
         <div className={showCampaignEnroll ? "forground" : "background"}>
         <div className='campDesceli'> You are eligible for these campaign. </div>
             {campList.map((items) =>(
               <div className='campaignCard' key={items.id} title='Click to apply' onClick={() => {handleCampaignCardclick({tag:items.id})}}>
                 <div>{items.company}</div>
                 <div className="campaignName">{items.name}</div>
                 <div><CgCalendarDates/>{items.start} - <CgCalendarDates />{items.end}</div>
                 <div>Campaign Description:{items.desc}</div>
                 <div className='apply campaign'>
                  <div className='lineeli'></div>
                 {showCampaignEnroll === items.id? 
                  <div className='EnrollCampaign'>
                    <div className='lineeli'>
                      <h3>Apply for this campaign</h3>
                    </div>
                    <label>Message for the business
                    <textarea rows={5} cols={50} onChange={handleChange} />
                    <button className='profileEditButton update' onClick={apply}>Apply</button> 
                    <button className='profileEditButton cancle' onClick={cancleApply}>Cancle</button></label>
                  </div>:null}
                 </div>
               </div>
             ))}
             </div>
             
     </div>
   )
}

export default EligibleCampaign;