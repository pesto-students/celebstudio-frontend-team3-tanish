
import React, { useEffect, useRef, useState } from 'react';
import pIMG from '../../../img/profileimg.PNG';
import Editform from './inputfield';

const Bprofile = () => {
    const [showEditButton, setShowEditButton] = useState();
    const [setEdit, updateSetEdit] = useState("");
    const [showPasswordEdit, setshowPasswordEdit] = useState(false);
    //image
    const [userImg,setuserImg]= useState();
    //personal details
    const [fname,setFname]= useState(["jitender"])
    const [lname,setLname]= useState(["prasad"])
    const [DOB, setDOB]= useState(["04-JAN-2022"])

    //contact details
    const [email, setEmail]= useState(["wwww.abc@gmail.com"])
    const [contact, setContact]= useState(["9741236890"])

    //security
    const [password, setPasswrod]= useState(["1234vbnmkl"]);
    const [oldpassword, setoldPasswrod]= useState([]);
    const [newpassword, setNewPassword] = useState([])
    const [verifypassword, setverifyPassword] = useState([]);



    const handleupdateSetEdit = ({tag}) => {
      updateSetEdit(tag);
    }

    const handleupdateChange = (data) => {
      console.log(data);
      if(!data || /^\s*$/.test(data )){
        updateSetEdit("");
        return;
      }

      switch(setEdit){
        case "fname":{
          setFname(data);
          updateSetEdit("");
          break;
        }
        case "lname":{
          setLname(data);
          updateSetEdit("");
          break;
        }
       
        case "email":{
          setEmail(data);
          updateSetEdit("");
          break;
        }
        case "contact":{
          setContact(data);
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
      if(oldpassword == password){
        if(newpassword === verifypassword){
          setPasswrod(verifypassword);
          alert("paswword change successfull")
          setshowPasswordEdit(!showPasswordEdit);
        }
        else{
          alert("password mismatch");
        }
      }
      else{
        alert("Wrong Password. Please enter the current password");
      }

    }

 


  
return(
  <div className='profileContainer' >
      <h2>My Profile</h2>
      
          
            <div className='imgtitle'>Profile Picture</div>
            <div className='imgContainer'>
            
                <div className='imgDiv'>
                  {
                    userImg ? userImg : <img src={pIMG} alt="profile"/>
                  }
                </div>
                <div className='editbutton'>
                  <button className='imgButton change' type='primary'  > Change</button>
                  <button className='imgButton delete' type='primary'  > Delete</button>
                </div>
            </div>


              <div className='imgtitle'>Personal Details</div>
              <div className='personalDetails'>

              <div className='pdetails' onMouseOut={() => setShowEditButton()} onMouseOver={() => setShowEditButton("fname")}>
              {setEdit !== 'fname' ?
                <div>
                  <label>First Name</label><br/>
                  <div className='PDdisplay'>{fname}</div>
                  {showEditButton === 'fname' ?  <button className='profileEditButton' onClick={() => {handleupdateSetEdit({tag:"fname"})}}>Change</button>
                  : null}
                </div>:
                <div>
                <label>First Name</label>
                <div className='PDdiaply'><Editform sendUpdate={handleupdateChange} type={"text"} cancleUpdate={handleCancleUpdate} /></div>
                </div>
                }

              </div>


              <div className='pdetails' onMouseOut={() => setShowEditButton()} onMouseOver={() => setShowEditButton("lname")}>
              {setEdit !== 'lname' ?
                <div>
                  <label>Last Name</label><br/>
                  <div className='PDdisplay'>{lname}</div>
                  {showEditButton === 'lname' ?  <button className='profileEditButton' onClick={() => {handleupdateSetEdit({tag:"lname"})}}>Change</button>
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
                  <div className='PDdisplay'>{email}</div>
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
              {setEdit !== 'contact' ?
                <div>
                  <label>Contact</label><br/>
                  <div className='PDdisplay'>{contact}</div>
                  {showEditButton === 'contact' ?  <button className='profileEditButton' onClick={() => {handleupdateSetEdit({tag:"contact"})}}>Change</button>
                  : null}
                </div>:
                <div>
                <label>Contact</label>
                <div className='PDdiaply'><Editform sendUpdate={handleupdateChange} type={"text"} cancleUpdate={handleCancleUpdate} /></div>
                </div>
                }

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