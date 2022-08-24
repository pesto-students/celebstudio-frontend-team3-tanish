import React, { useState } from 'react';
import '../css/influencerSignup.css';
import influencer from '../influencer.PNG';
import axios from 'axios';

const InfluencerSignUP = () => {
  const [formDetails,setFormDetails] = useState({fname:'',lname: '',cno:'', email: '', password: ''});
  const request = {
    method:'post',
    header:'application/json',
    url:'http://localhost:8000/signup/influencer',
    data: formDetails,
  }

  const setChange = (event) => {
    const {name,value} = event.target
    setFormDetails({...formDetails, [name]:value, });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("sending details to backend for processing");
    axios(request)
    .then((res) => {console.log(res)})
    .catch((err) => {console.log(err)})
  }
  return (
    <div className='IScontainer'>
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
          <input type="text" name="password" className='iforminput' placeholder="Your name.." required value={formDetails.value} onChange={setChange}/>
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