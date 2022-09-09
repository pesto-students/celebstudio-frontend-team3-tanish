
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import pIMG from '../../../img/profileimg.PNG';
import Editform from './inputfield';
import {setData} from '../../../signup/authSlice';

const Bprofile = () => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.authDetails.token);
  const userID = useSelector(state => state.authDetails.userID);
  const userData = useSelector(state => state.authDetails.userData);
  let user = useSelector(state => state.authDetails.userData);
  console.log(token);


    const [showEditButton, setShowEditButton] = useState();
    const [setEdit, updateSetEdit] = useState("");
    const [showPasswordEdit, setshowPasswordEdit] = useState(false);
    //image
    const [addImg, setAddImage] = useState(false);
    const [sendImg, setSendImg] = useState([]);
    const [userImg,setuserImg]= useState();

    //personal details
    const [profilData, setProfileData] = useState({
      first_name:userData.first_name,
      last_name:userData.last_name,
      email:userData.email,
      company_name:"",
      company_url:"",
    })

    //security
    const [oldpassword, setoldPasswrod]= useState();
    const [newpassword, setNewPassword] = useState([])
    const [verifypassword, setverifyPassword] = useState([]);



    const handleupdateSetEdit = ({tag}) => {
      updateSetEdit(tag);
    }



    const handleupdateChange = (data) => {

      const request = {
        method:'patch',
        header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
        url:`https://celebackend.herokuapp.com/api/v1/business/${userID}`,
        data:profilData,
      }


      console.log(data);
      if(!data || /^\s*$/.test(data )){
        updateSetEdit("");
        return;
      }

      switch(setEdit){
        case "first_name":{
          setProfileData({...profilData, first_name:data});
          axios(request)
          .then(res => {console.log(res.data.data)
            let data = res.data.data.profile;
            dispatch(setData(data));
            console.log(user)})
          .catch(err => console.log(err));
          updateSetEdit("");
          break;
        }

        case "last_name":{
          setProfileData({...profilData, last_name:data});
          axios(request)
          .then(res => {console.log(res.data.data)
            let data = res.data.data.profile;
            dispatch(setData(data));
            console.log(user)})
          .catch(err => console.log(err));
          updateSetEdit("");
          break;
        }
       
        case "email":{
          setProfileData({...profilData, email:data});
          axios(request)
          .then(res => {console.log(res.data.data)
            let data = res.data.data.profile;
            dispatch(setData(data));
            console.log(user)})
          .catch(err => console.log(err));
          updateSetEdit("");
          break;
        }
      
        default: console.log("something went wrong in handle update change");
      }

    }

    const handleCancleUpdate = () => {
      updateSetEdit("");
    }

    const handlePasswordChange1 = (event) => {
      setoldPasswrod(event.target.value);
    }

    const handlePasswordChange2 = (event) => {
      setNewPassword(event.target.value);
    }

    const handlePasswordChange3 = (event) => {
      setverifyPassword(event.target.value);
    }

   

    const handlePasswordSubmit = (event) => {
      event.preventDefault();


      if(!oldpassword || !newpassword || !verifypassword ){
        alert("Please fill in the details");
        updateSetEdit("");
        return;
      }

      const passwordChange = {
        method:'patch',
        header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
        url:`https://celebackend.herokuapp.com/api/v1/business/${userID}/change-password`,
      }

      let password = {
        passwordCurrent:oldpassword,
        password:newpassword,
        passwordConfirm:verifypassword,
      }

      let passwordChangeRequest = {...passwordChange, data:password}

      axios(passwordChangeRequest)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

    }

    const handleAddImage = (event) => {
      setAddImage(true);
    }

    const handleImgChange = (event) => {
      setSendImg({...sendImg,selectedFile:event.target.files[0]});
      console.log(event.target.files[0]);
    }


    const handleimgUpload = (event) =>{
      const formData = new FormData();
    
      console.log(sendImg);

      // formData.append(
      //   "myFile",
      //   addImg.selectedFile,
      //   addImg.selectedFile.name
      // );
      // const requestPack = {...request, data:formData};
      // console.log(requestPack);

    
    
    }

 


  
return(
  <div className='profileContainer' >
      <h2>My Profile</h2>
      
          
            <div className='imgtitle'>Profile Picture</div>
            <div className='imgContainer'>
                <div className='imgSubcontainer'>
                  <div className='imgDiv'>
                    {
                      userImg ? userImg : <img src={pIMG} alt="profile"/>
                    }
                  </div>
                  
                  <div className='editbutton'>
                    <button className='imgButton change' type='primary'  onClick={() => {handleAddImage()}}> Change</button>
                    <button className='imgButton delete' type='primary'  > Delete</button>
                  </div>
                </div>
                {addImg ? 
                <div className='uplodImg'>
                  <input type='file' onChange={handleImgChange} /> <button onClick={() => {handleimgUpload()}}>Upload</button>
                </div>  : null}
            </div>


              <div className='imgtitle'>Personal Details</div>
              <div className='personalDetails'>

              <div className='pdetails' onMouseOut={() => setShowEditButton()} onMouseOver={() => setShowEditButton("first_name")}>
              {setEdit !== 'first_name' ?
                <div>
                  <label>First Name</label><br/>
                  <div className='PDdisplay'>{profilData.first_name}</div>
                  {showEditButton === 'first_name' ?  <button className='profileEditButton' onClick={() => {handleupdateSetEdit({tag:"first_name"})}}>Change</button>
                  : null}
                </div>:
                <div>
                <label>First Name</label>
                <div className='PDdiaply'><Editform sendUpdate={handleupdateChange} type={"text"} cancleUpdate={handleCancleUpdate} /></div>
                </div>
                }

              </div>


              <div className='pdetails' onMouseOut={() => setShowEditButton()} onMouseOver={() => setShowEditButton("last_name")}>
              {setEdit !== 'last_name' ?
                <div>
                  <label>Last Name</label><br/>
                  <div className='PDdisplay'>{profilData.last_name}</div>
                  {showEditButton === 'last_name' ?  <button className='profileEditButton' onClick={() => {handleupdateSetEdit({tag:"last_name"})}}>Change</button>
                  : null}
                </div>:
                <div>
                <label>Last Name</label>
                <div className='PDdiaply'><Editform sendUpdate={handleupdateChange} type={"text"} cancleUpdate={handleCancleUpdate} /></div>
                </div>
                }

              </div>


      
              </div>

              <div className='imgtitle'>Contact details</div>
              <div className='personalDetails'>
              <div className='pdetails' onMouseOut={() => setShowEditButton()} onMouseOver={() => setShowEditButton("email")}>
              {setEdit !== 'email' ?
                <div>
                  <label>Email</label><br/>
                  <div className='PDdisplay'>{profilData.email}</div>
                  {showEditButton === 'email' ?  <button className='profileEditButton' onClick={() => {handleupdateSetEdit({tag:"email"})}}>Change</button>
                  : null}
                </div>:
                <div>
                <label>Email</label>
                <div className='PDdiaply'><Editform sendUpdate={handleupdateChange} type={"email"} cancleUpdate={handleCancleUpdate} /></div>
                </div>
                }

              </div>

              <div className='pdetails' onMouseOut={() => setShowEditButton()} onMouseOver={() => setShowEditButton("contact")}>
              

              </div>
              </div>


              <div className='imgtitle'>Security</div>
                <div className="ChangePassword" onClick={() => {setshowPasswordEdit(!showPasswordEdit)}}>Change Password</div>
                {showPasswordEdit ? 
                <div className='pdetails'>
                  <form onSubmit={handlePasswordSubmit}>
                  <label>Old password</label>   <div><input  type="text"  onChange={handlePasswordChange1} required /></div>
                  <label>New Password</label>   <div><input  type="text" onChange={handlePasswordChange2} required/></div>
                  <label>Verify Password</label><div><input  type="text" onChange={handlePasswordChange3} required/><button type='submit' className='profileEditButton update' >Update</button><button className='profileEditButton cancle' onClick={() => {setshowPasswordEdit(!showPasswordEdit)}}>Cancle</button></div>
                  </form>
                </div>: null}
              
    </div>
  )

}


export default Bprofile;