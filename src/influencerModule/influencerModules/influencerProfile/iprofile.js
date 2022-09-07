import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pIMG from '../../../img/profileimg.PNG';
import Editform from './inputfield';
import PlatformFacebook from './PlatformFacebook';
import PlatformInstagrm from './PlatformInstagram';
import PlatformTwitter from './PlatformTwitter';
import {userData} from '../../../signup/authSlice';

const Iprofile = () => {
  const dispath = useDispatch();
  const token = useSelector(state => state.authDetails.token);
  const userID = useSelector(state => state.authDetails.userID);
  const userData = useSelector(state => state.authDetails.userData);

    const [showEditButton, setShowEditButton] = useState();
    const [setEdit, updateSetEdit] = useState("");
    const [showPasswordEdit, setshowPasswordEdit] = useState(false);

    //image
    const [userImg,setuserImg]= useState();
    //personal details
    const [fname,setFname]= useState(userData.first_name)
    const [lname,setLname]= useState(userData.last_name)
    const [DOB, setDOB]= useState(userData.Date_of_Birth.slice(0,10))
    console.log(DOB);

    //contact details
    const [Email, setEmail]= useState(userData.email)
    const [contact, setContact]= useState(userData.phone)

    //socialMedia details
  

    const [primaryCatagory, setPrimaryCategory]= useState(userData.product_category);
    const productCategory = [
      {id:'1',category:"Fashion & Apparel"      }    , 
      {id:'2',category:"Food & Beverages"       }  ,
      {id:'3',category:"Health & Wellness"      }  ,
      {id:'4',category:"Pets"               }  ,
      {id:'5',category:"Beauty"                },  
      {id:'6',category:"Jewellery & Accessories" }
    ]

  
    //security
    const [password, setPasswrod]= useState(["1234vbnmkl"]);
    const [oldpassword, setoldPasswrod]= useState([]);
    const [newpassword, setNewPassword] = useState([])
    const [verifypassword, setverifyPassword] = useState([]);
    


    const requestProfile = {
      method:'patch',
      header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
      url:` https://celebackend.herokuapp.com/api/v1/influencer/${userID}`,
    }

    const handleupdateSetEdit = ({tag}) => {
      updateSetEdit(tag);
    }

    const handlePCchange = (event) => {
      setPrimaryCategory(event.target.value);
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
          console.log(fname);
          let first_name = {"first_name":fname};
          let request = {...requestProfile,data:first_name}
          console.log(request);
          axios(request)
          .then(res => console.log(res))
          .catch(err => console.log(err));
          updateSetEdit("");
          break;
        }
        case "lname":{
          setLname(data);
          console.log(fname);
          let last_name = {"last_name":lname};
          let request = {...requestProfile,data:last_name}
          console.log(request);
          axios(request)
          .then(res => console.log(res))
          .catch(err => console.log(err));
          updateSetEdit("");
          break;
          
        }
        case "DOB":{
          setDOB(data);
          console.log(DOB);
          let date_of_birth = {"Date_of_Birth":data};
          let request = {...requestProfile,data:date_of_birth}
          console.log(request);
          axios(request)
          .then(res => console.log(res))
          .catch(err => console.log(err));
          updateSetEdit("");
          break;
        }
        case "email":{
          setEmail(data);
          console.log(Email);
          let email = {"email":data};
          let request = {...requestProfile,data:email}
          console.log(request);
          axios(request)
          .then(res => console.log(res))
          .catch(err => console.log(err));
          updateSetEdit("");
          break;
        }
        case "contact":{
          setContact(data);
          console.log(contact);
          let phone = {"phone":contact};
          let request = {...requestProfile,data:phone}
          console.log(request);
          axios(request)
          .then(res => console.log(res))
          .catch(err => console.log(err));
          updateSetEdit("");
          break;
        }
        case "PC":{
          console.log(primaryCatagory);
          let product_category = {"product_category":primaryCatagory};
          let request = {...requestProfile,data:product_category}
          console.log(request);
          axios(request)
          .then(res => console.log(res))
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


              <div className='pdetails' onMouseOut={() => setShowEditButton()} onMouseOver={() => setShowEditButton("DOB")}>
              {setEdit !== 'DOB' ?
                <div>
                  <label>DOB</label><br/>
                  <div className='PDdisplay'>{DOB}</div>
                  {showEditButton === 'DOB' ?  <button className='profileEditButton' onClick={() => {handleupdateSetEdit({tag:"DOB"})}}>Change</button>
                  : null}
                </div>:
                <div>
                <label>DOB</label>
                <div className='PDdiaply'><Editform sendUpdate={handleupdateChange} type={"date"} cancleUpdate={handleCancleUpdate} /></div>
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
                  <div className='PDdisplay'>{Email}</div>
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






              <div className='imgtitle'>Product Category</div>
              <div className='personalDetails'>
              <div className='pdetails' onMouseOut={() => setShowEditButton()} onMouseOver={() => setShowEditButton("PC")}>
              {setEdit !== 'PC' ?
                <div>
                  <div className='PDdisplay'>{productCategory.map(item => item.id == primaryCatagory ? item.category : null)}</div>
                  {showEditButton === 'PC' ?  <button className='profileEditButton' onClick={() => {handleupdateSetEdit({tag:"PC"})}}>Change</button>
                  : null}
                </div>:
                <div>
                <div className='PDdiaply'>
                <select name='product_category' defaultValue={"default"}  value={primaryCatagory} onChange={handlePCchange}>
                <option value="default"> Please select a Product catagory</option>
                <option value='1'>Fashion & Apparel     </option>
                <option value='2'>Food & Beverages     </option>
                <option value='3'>Health & Wellness       </option>
                <option value='4'> Pets         </option>
                <option value='5'>Beauty                  </option>
                <option value='6'>Jewellery & Accessories</option>
              </select>
              <button className='profileEditButton update' onClick={handleupdateChange}>
            Update
          </button>
          <button className='profileEditButton cancle' onClick={() => setEdit("")}>
            Cancle
          </button>
                </div>
                </div>
                }

              </div>
              </div>












              <div className='imgtitle'>Platform Details</div>
              <PlatformFacebook />
              <PlatformInstagrm />
              <PlatformTwitter />

      


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


export default Iprofile;