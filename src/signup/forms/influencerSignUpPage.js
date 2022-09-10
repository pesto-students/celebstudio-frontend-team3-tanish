import React, { useState } from 'react';
import '../css/influencerSignup.css';
import influencer from '../../img/influencer.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {BsArrowRight} from 'react-icons/bs'


const InfluencerSignUP = () => {
  const redirect = () => {setTimeout(() => {setDispalyStatus("");navigate('/signup');clearTimeout(redirect)},3000)};
  const navigate = useNavigate();
  const [displayStatus, setDispalyStatus] = useState("");
  const [formDetails,setFormDetails] = useState({fname:'',lname: '',cno:'', email: '', password: ''});
  const token = "justForFun"
  const request = {
    method:'post',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:'https://celebackend.herokuapp.com/api/v1/signup/influencer/',
    data: formDetails,
  }

  const setChange = (event) => {
    setDispalyStatus("");
    const {name,value} = event.target;
    setFormDetails({...formDetails, [name]:value, });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const timer = () => {setTimeout(() => {setDispalyStatus("");navigate('/signup')},1000)};
    console.log("sending details to backend for processing");
    axios(request)
    .then((res) => {
      console.log(res);
      if(res.status === 201 && res.data.status === 'success'){
        setDispalyStatus("success");
        redirect();
      }
      else{
        setDispalyStatus("failed")
      }
    })
    .catch((err) => {
      setDispalyStatus("failed");
    })
  }
  return (
    <div className='IScontainer'>
      {displayStatus === 'success' ? 
      <div className='responseStatus signupsuccess'>
        Signup Successfull!! Redirecting to login Page.
      </div>:null}

      {displayStatus === 'failed' ? 
      <div className='responseStatus signupfailed'>
        Something went wrong:(. Please try again
      </div>:null}
      
    <div className='influencerSignUp'>
      
    <form className="iform" onSubmit={handleSubmit}>
      <h1>Signup with celebStudio</h1>
      <div className="irow">
          <label>First Name</label>
          <div><input type="text" name="fname" className='iforminput' placeholder="Your name.." required value={formDetails.value} onChange={setChange}/></div>
      </div>

      <div className="irow">
          <label>Last Name</label><br/>
          <input type="text" name="lname" className='iforminput' placeholder="Your name.." required value={formDetails.value} onChange={setChange}/>
      </div>

      <div className="irow">
          <label>Contact Number</label><br/>
          <input type="text" name="cno" className='iforminput' placeholder="Your name.." required value={formDetails.value} onChange={setChange}/>
      </div>

      <div className="irow">
          <label>Email</label><br/>
          <input type="email" name="email" className='iforminput' placeholder="Your name.." required value={formDetails.value} onChange={setChange}/>
      </div>

      <div className="irow">
          <label>Password</label><br/>
          <input type="password" name="password" className='iforminput' placeholder="Your name.." required value={formDetails.value} onChange={setChange}/>
      </div>

      <div className='buttonb'><button type='submit' className='businessSubmit'>Continue <span className='arrowIcon'><BsArrowRight/></span></button></div>
    </form>
  <div className='ISimg'>
    <img src={influencer} alt='influencer'></img>
  </div>
  </div>
  </div>
  )
}

export default InfluencerSignUP;