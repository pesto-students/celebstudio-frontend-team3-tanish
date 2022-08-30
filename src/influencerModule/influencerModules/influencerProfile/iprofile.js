import { current } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react';
import pIMG from '../../../img/profileimg.PNG';
import Editform from './inputfield';

const Iprofile = () => {
    const [showEditButton, setShowEditButton] = useState();
    const [setEdit, updateSetEdit] = useState("");
    const [showPasswordEdit, setshowPasswordEdit] = useState(false);
    const [showFacbookEdit, setShowFacebookEdit] = useState(false);
    const [showInstagramEdit, setShowInstagramEdit] = useState(false);
    const [showTwitterEdit, setShowTwitterEdit] = useState(false);
    const [FisActive, setHandleFisActive] = useState(false);
    const [IisActive, setHandleIisActive] = useState(false);
    const [TisActive, setHandleTisActive] = useState(false);
    const [URL, setURL] = useState("");
    const [fcount , setfcount] = useState("");
    const [cost , setcost] = useState("");
    //image
    const [userImg,setuserImg]= useState();
    //personal details
    const [fname,setFname]= useState(["jitender"])
    const [lname,setLname]= useState(["prasad"])
    const [DOB, setDOB]= useState(["04-JAN-2022"])

    //contact details
    const [email, setEmail]= useState(["wwww.abc@gmail.com"])
    const [contact, setContact]= useState(["9741236890"])

    //socialMedia details
    const frecord = {
      fisActive:false,
      furl:"",
      ffcount:"",
      fcost:"",
    }
    const [facebook,setFacebook] = useState([frecord]);

    const irecord = {
      iisActive:false,
      iurl:"",
      ifcount:"",
      icost:"",
    }

    const [instagram,setInstagram]= useState([irecord]);

    const trecord = {
      tisActive:false,
      turl:"",
      tfcount:"",
      tcost:"",
    }

    const [twitter,setTwitter]= useState([trecord])

    const [primaryCatagory, setPrimaryCategory]= useState(["Biking"])
    const [secondaryCatagory,setSecondaryCatagory]= useState(["Phototgraphy"])
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
        case "DOB":{
          setDOB(data);
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

    const handleURLchange = (event) => {
      setURL(event.target.value);
    }

    const handleFcountchange = (event) => {
      setfcount(event.target.value);
    }

    const handleCostchange = (event) => {
      setcost(event.target.value);
    }


    const handleFacebookUpdate = (event) => {
      event.preventDefault();
      console.log(URL,fcount,cost);
      setFacebook(current => current.map(obj => {return{...obj, fisActive:true, furl:URL, ffcount:fcount, fcost:cost}}));
      console.log(facebook);
      setURL("");
      setfcount("");
      setcost("");
      console.log(facebook);
      setShowFacebookEdit(false);
    }

    const handleInstagramSubmit = (event) => {
      event.preventDefault();
      console.log(URL,fcount,cost);
      setInstagram(current => current.map(obj => {return{...obj, iisActive:true, iurl:URL, ifcount:fcount, icost:cost}}));
      console.log(instagram);
      setURL("");
      setfcount("");
      setcost("");
      console.log(instagram);
      setShowInstagramEdit(false);
    }

    const handleTwitterupdate = (event) => {
      event.preventDefault();
      console.log(URL,fcount,cost);
      setTwitter(current => current.map(obj => {return{...obj, tisActive:true, turl:URL, tfcount:fcount, tcost:cost}}));
      console.log(twitter);
      setURL("");
      setfcount("");
      setcost("");
      console.log(twitter);
      setShowTwitterEdit(false);
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


              <div className='imgtitle'>Platform Details</div>
              <div className='personalDetails'>
              {facebook.map(items => items.fisActive ? 
              <div className='pdetails platformContainer'><div className="ChangePassword"  onClick={() => {setShowFacebookEdit(!showFacbookEdit)}}>{showFacbookEdit ? "Cancle facebook Update" : "Change facebook details"} </div>
              {!showFacbookEdit ? 
              <div >
                {facebook.map(items =>
                <div className='pdetails platform'>
                <label>ProfileUrl</label>  <br/> 
                <div className='PDdisplay'>{items.furl}</div><br/>
                <label>FollowerCount</label><br/>
                <div className='PDdisplay'>{items.ffcount}</div><br/>
                <label>Post cost</label>    <br/>
                <div className='PDdisplay'>{items.fcost}</div><br/>
                </div>
                )}
              </div> : <div className='pdetails platform'>
                <form onSubmit={handleFacebookUpdate}>
                <label>ProfileUrl</label>  <br/> 
                <input type="text" onChange={handleURLchange}/><br/> 
                <label>FollowerCount</label><br/>
                <input type="text" onChange={handleFcountchange}/><br/> 
                <label>Post cost</label>    <br/>
                <input type="text" onChange={handleCostchange}/> 
                <button type="submit" className='profileEditButton update'>Submit</button><br/>
                </form>
              </div>}
              
              </div>
              :
              <div className='pdetails platformContainer'><div className="ChangePassword" onClick={() => {setHandleFisActive(!FisActive)}}>{!FisActive ? "Add faceBook" : "Cancle adding facebook"}</div>
              {FisActive  ?
                <div className='pdetails platform'>
                <form onSubmit={handleFacebookUpdate}>
                <label>ProfileUrl</label>  <br/> 
                <input type="text" onChange={handleURLchange}/><br/> 
                <label>FollowerCount</label><br/>
                <input type="text" onChange={handleFcountchange}/><br/> 
                <label>Post cost</label>    <br/>
                <input type="text" onChange={handleCostchange}/> 
                <button type="submit" className='profileEditButton update'>Submit</button><br/>
                </form>
                </div>:
                null
                }
              </div>)}
              </div>

              <div className='personalDetails'>
              {instagram.map(items => items.iisActive ? 
              <div className='pdetails platformContainer'><div className="ChangePassword"  onClick={() => {setShowInstagramEdit(!showInstagramEdit)}}>{showInstagramEdit ? "Cancle instagram Update" : "Change instagram details"} </div>
              {!showInstagramEdit ? 
              <div >
                {instagram.map(items =>
                <div className='pdetails platform'>
                <label>ProfileUrl</label>  <br/> 
                <div className='PDdisplay'>{items.iurl}</div><br/>
                <label>FollowerCount</label><br/>
                <div className='PDdisplay'>{items.ifcount}</div><br/>
                <label>Post cost</label>    <br/>
                <div className='PDdisplay'>{items.icost}</div><br/>
                </div>
                )}
              </div> : <div className='pdetails platform'>
                <form onSubmit={handleInstagramSubmit}>
                <label>ProfileUrl</label>  <br/> 
                <input type="text" onChange={handleURLchange}/><br/> 
                <label>FollowerCount</label><br/>
                <input type="text" onChange={handleFcountchange}/><br/> 
                <label>Post cost</label>    <br/>
                <input type="text" onChange={handleCostchange}/> 
                <button type="submit" className='profileEditButton update'>Submit</button><br/>
                </form>
              </div>}
              
              </div>
              :
              <div className='pdetails platformContainer'><div className="ChangePassword" onClick={() => {setHandleIisActive(!IisActive)}}>{!IisActive ? "Add Instagram":"Cancle adding Instagram"}</div>
              {IisActive  ?
                <div className='pdetails platform'>
                <form onSubmit={handleInstagramSubmit}>
                <label>ProfileUrl</label>  <br/> 
                <input type="text" onChange={handleURLchange} required/><br/> 
                <label>FollowerCount</label><br/>
                <input type="text" onChange={handleFcountchange} required/><br/> 
                <label>Post cost</label>    <br/>
                <input type="text" onChange={handleCostchange} required/> 
                <button type="submit" className='profileEditButton update'>Submit</button><br/>
                </form>
                </div>:null}
              </div>)}
              </div>

              <div className='personalDetails'>
              {twitter.map(items => items.tisActive ? 
              <div className='pdetails platformContainer'><div className="ChangePassword"  onClick={() => {setShowTwitterEdit(!showTwitterEdit)}}>{showTwitterEdit ? "Cancle twitter Update" : "Change twitter details"} </div>
              {!showTwitterEdit ? 
              <div >
                {twitter.map(items =>
                <div className='pdetails platform'>
                <label>ProfileUrl</label>  <br/> 
                <div className='PDdisplay'>{items.turl}</div><br/>
                <label>FollowerCount</label><br/>
                <div className='PDdisplay'>{items.tfcount}</div><br/>
                <label>Post cost</label>    <br/>
                <div className='PDdisplay'>{items.tcost}</div><br/>
                </div>
                )}
              </div> : <div className='pdetails platform'>
                <form onSubmit={handleTwitterupdate}>
                <label>ProfileUrl</label>  <br/> 
                <input type="text" onChange={handleURLchange}/><br/> 
                <label>FollowerCount</label><br/>
                <input type="text" onChange={handleFcountchange}/><br/> 
                <label>Post cost</label>    <br/>
                <input type="text" onChange={handleCostchange}/> 
                <button type="submit" className='profileEditButton update'>Submit</button><br/>
                </form>
              </div>}
              
              </div>
              :
              <div className='pdetails platformContainer'><div className="ChangePassword" onClick={() => {setHandleTisActive(!TisActive)}}>{!TisActive ? "Add Twitter":"Cancle Adding Twitter"}</div>
              {TisActive  ?
                <div className='pdetails platform'>
                <form onSubmit={handleTwitterupdate}>
                <label>ProfileUrl</label>  <br/> 
                <input type="text" onChange={handleURLchange}/><br/> 
                <label>FollowerCount</label><br/>
                <input type="text" onChange={handleFcountchange}/><br/> 
                <label>Post cost</label>    <br/>
                <input type="text" onChange={handleCostchange}/> 
                <button type="submit" className='profileEditButton update'>Submit</button><br/>
                </form>
                </div>:null}
              </div>)}

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


export default Iprofile;