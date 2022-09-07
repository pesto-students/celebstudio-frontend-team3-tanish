eligible camapgin

<div className='dashboardCampaign'>
         <div className='dashboardgreet'>
         <h1>Hey {fname},</h1> 
         </div>
         
         <div className='line'></div>
         <div className='campDesceli'> You are eligible for these campaign. </div>
         <div className={showCampaignEnroll ? "foreground" : "background"}>
                 {showCampaignEnroll ? 
                  <div className='EnrollCampaign'>
                      <h3>Apply Campaign</h3>
                      <h2>{eligibleCampaign.map(items => items._id === showCampaignEnroll ? items.name:null)}</h2>
                    <label>Message for the business</label>
                    <textarea rows={7} cols={50} onChange={handleChange} /><br/>
                    <div className="ApplicationButton">
                    <button className='update' onClick={() => {apply()}}>Apply</button> 
                    <button className='cancle' onClick={() =>{cancleApply()}}>Cancel</button>
                    </div>
                  </div>:null}
                 </div>
             {eligibleCampaign.map((items) =>(
               <div className='campaignCard' key={items._id} title='Click to apply' onClick={() => {handleCampaignCardclick({tag:items._id})}}>
                 <div>{items.business_id.company_name}</div>
                 <div className="campaignName">{items.name}</div>
                 <div><CgCalendarDates/>{items.start_DATE.slice(0,10)} - <CgCalendarDates />{items.end_date.slice(0,10)}</div>
                 <div>Campaign Description:{items.description}</div>
               </div>
             ))}
             
     </div>
   )