import React, { useState } from 'react';
import '../css/influencerSignup.css';
import influencer from '../influencer.PNG';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
        Login Successfull!! Redirecting to login Page.
      </div>:null}

      {displayStatus === 'failed' ? 
      <div className='responseStatus signupfailed'>
        Something went wrong:(. Please try again
      </div>:null}
      
    <div className='influencerSignUp'>
      <h1>Signup with celebStudio</h1>
      
    <form onSubmit={handleSubmit}>

      <div className="irow">
        <div className="icol-25">
          <label>First Name</label>
        </div>

        <div className="icol-75">
          <input type="text" name="fname" className='iforminput' placeholder="Your name.." required value={formDetails.value} onChange={setChange}/>
        </div>
      </div>

      <div className="irow">
        <div className="icol-25">
          <label>Last Name</label>
        </div>

        <div className="icol-75">
          <input type="text" name="lname" className='iforminput' placeholder="Your name.." required value={formDetails.value} onChange={setChange}/>
        </div>
      </div>

      <div className="irow">
        <div className="icol-25">
          <label>Contact Number</label>
        </div>

        <div className="icol-75">
          <input type="text" name="cno" className='iforminput' placeholder="Your name.." required value={formDetails.value} onChange={setChange}/>
        </div>
      </div>

      <div className="irow">
        <div className="icol-25">
          <label>Email</label>
        </div>

        <div className="icol-75">
          <input type="email" name="email" className='iforminput' placeholder="Your name.." required value={formDetails.value} onChange={setChange}/>
        </div>
      </div>

      <div className="irow">
        <div className="icol-25">
          <label>Password</label>
        </div>

        <div className="icol-75">
          <input type="password" name="password" className='iforminput' placeholder="Your name.." required value={formDetails.value} onChange={setChange}/>
        </div>
      </div>
      <div className='buttons'><button type='submit'>Submit</button></div>
    </form>
  </div>
  <div className='ISimg'>
    <img src={influencer} alt='influencer'></img>
  </div>
  </div>
  )
}

export default InfluencerSignUP;