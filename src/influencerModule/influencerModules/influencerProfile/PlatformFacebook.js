import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import LoadingSpinner from '../../../loader/loader';
import {setData} from '../../../signup/authSlice';

    const  PlatformFacebook = ()  => {
      const dispatch = useDispatch();
    const token = useSelector(state => state.authDetails.token);
    const userID = useSelector(state => state.authDetails.userID);
    const userData = useSelector(state => state.authDetails.userData.facebook);
    const [facebookdata,setFacebook] = useState(userData);
    const [URL, setURL] = useState("");
    const [FCOUNT , setFCOUNT] = useState("");
    const [COST , setCOST] = useState("");
    const [showEditForm, handleShowEditForm] = useState();
    let user = useSelector(state => state.authDetails.userData);
    const [isLoading, setIsLoading] = useState(false);

    const requestProfile = {
        method:'patch',
        header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
        url:` https://celebackend.herokuapp.com/api/v1/influencer/${userID}`,
      }

   
    const handleURLchange = (event) => {
        setURL(event.target.value);
      }
  
      const handleFcountchange = (event) => {
        setFCOUNT(event.target.value);
      }
  
      const handleCostchange = (event) => {
        setCOST(event.target.value);
      }


      const handleCancel = (event) => {
        handleShowEditForm(false);
        setURL("");
        setFCOUNT("");
        setCOST("");
      }
    
  
    //checking facebook status from redux. if active, then setShowFecbookedit is set to true which
    const handleFacebookUpdate = (event) => {
        event.preventDefault();
        setIsLoading(true);

        if(!URL || !FCOUNT || !COST){
          alert("you left a field empty")
          setURL("");
          setFCOUNT("");
          setCOST("");
          return;
        }


        setFacebook({...facebookdata, isactive: true, url:URL, follower_count:FCOUNT, cost:COST})
        
        const facebookrequest = {...requestProfile,data:{facebook:{isactive: true, url:URL, follower_count:FCOUNT, cost:COST}}};
        console.log(facebookrequest);
        axios(facebookrequest)
        .then(res => {console.log(res.data.data)
          let data = res.data.data.profile;
          dispatch(setData(data));
          console.log(user);
        setIsLoading(false);})
        .catch(err => {console.log(err);
          setIsLoading(false)});
        setURL("");
        setFCOUNT("");
        setCOST("");
        handleShowEditForm(!showEditForm);
      }

  return (
    <>
    {isLoading ? <LoadingSpinner /> : 
    <div className='personalDetails'>
    {facebookdata.isactive ? 
    <div className='pdetails platformContainer'><div className="ChangePassword"  onClick={() => {handleShowEditForm(!showEditForm)}}>Change facebook details</div>
    {!showEditForm ? 
    <div >
      <div className='pdetails platform'>
      <label>ProfileUrl</label>  <br/> 
      <div className='PDdisplay'>{facebookdata.url}</div><br/>
      <label>FollowerCount</label><br/>
      <div className='PDdisplay'>{facebookdata.follower_count}</div><br/>
      <label>Post COST</label>    <br/>
      <div className='PDdisplay'>{facebookdata.cost}</div><br/>
      </div>
      
    </div> : <div className='pdetails platform'>
      <form onSubmit={handleFacebookUpdate}>
      <label>ProfileUrl</label>  <br/> 
      <input type="text" onChange={handleURLchange}/><br/> 
      <label>FollowerCount</label><br/>
      <input type="text" onChange={handleFcountchange}/><br/> 
      <label>Post COST</label>    <br/>
      <input type="text" onChange={handleCostchange}/> 
      <button type="submit" className='profileEditButton update'>Submit</button><br/>
      </form>
    </div>}
    
    </div>
    :
    <div className='pdetails platformContainer'><div className="ChangePassword" onClick={() => {handleShowEditForm(!showEditForm)}}>Add faceBook</div>
    {showEditForm  ?
      <div className='pdetails platform'>
      <form onSubmit={handleFacebookUpdate}>
      <label>ProfileUrl</label>  <br/> 
      <input type="text" onChange={handleURLchange}/><br/> 
      <label>FollowerCount</label><br/>
      <input type="text" onChange={handleFcountchange}/><br/> 
      <label>Post COST</label>    <br/>
      <input type="text" onChange={handleCostchange}/> 
      <button type="submit" className='profileEditButton update'>Submit</button><br/>
      <button className='profileEditButton cancle' onClick={() => {handleCancel()}}>Cancel</button>
      </form>
      </div>:
      null
      }
    </div>}
    </div>
    }
    </>
  )
}

export default PlatformFacebook;