import React from 'react';
import '../../influencerModule.css';

const Campaign = () => {
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

  return (
    <div className='dashboardCampaign'>
        <h1>Campaigns List</h1>
            {campList.map((items) =>(
              <div className='campaignCard' key={items.id}>
                <div>Name:{items.name      }</div>
                <div>Staus:{items.status    }</div>
                <div>Start:{items.start     }</div>
                <div>End:{items.end       }</div>
              </div>
            ))}
    </div>
  )
}

export default Campaign;