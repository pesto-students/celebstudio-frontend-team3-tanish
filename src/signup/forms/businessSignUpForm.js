import React, { useState } from 'react';
import '../css/businessSignup.css';
import axios from 'axios';
import {BsArrowRight} from 'react-icons/bs';

const BusinessSignUP = () => {
  const [formDetails,setFormDetails] = useState({fname:'',lname: '', cname: '', curl: '', email: '', password: ''});
  const request = {
    method:'post',
    header:'application/json',
    url:'http://localhost:8000/signup/business',
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
  
    <div className='businessSignUp'>
    <form onSubmit={handleSubmit}>
  
    <div className='cS'>celebStudio</div>
      <div className="row">
    <div className="col-25">
      <label>First Name</label>
    </div>

    <div className="col-75">
      <input type="text" name="fname" className='bforminput' placeholder="Your name.." required value={formDetails.value} onChange={setChange}/>
    </div>
  </div>

  <div className="row">
    <div className="col-25">
      <label >Last Name</label>
    </div>

    <div className="col-75">
      <input type="text" name="lname" className='bforminput' placeholder="Your last name.." required value={formDetails.value} onChange={setChange}/>
    </div>
  </div>


  <div className="row">
    <div className="col-25">
      <label >Company Name</label>
    </div>

    <div className="col-75">
      <input type="text" name="cname" className='bforminput' placeholder="Company.." required value={formDetails.value} onChange={setChange}/>
    </div>
  </div>

  <div className="row">
    <div className="col-25">
      <label >Company Url</label>
    </div>

    <div className="col-75">
      <input type="url" name="curl" className='bforminput' placeholder="company url.." required value={formDetails.value} onChange={setChange} />
    </div>
  </div>

  <div className="row">
    <div className="col-25">
      <label > E-mail</label>
    </div>

    <div className="col-75">
      <input type="email" name="email" className='bforminput' placeholder="email.." required value={formDetails.value} onChange={setChange} />
    </div>
  </div>

  <div className="row">
    <div className="col-25">
      <label >Password</label>
    </div>

    <div className="col-75">
      <input type="password" name="password" className='bforminput' placeholder="Your password.." required value={formDetails.value} onChange={setChange} />
    </div>
  </div>

  
  <div className='buttonb'><button type='submit'>Continue <span className='arrowIcon'><BsArrowRight/></span></button></div>
  </form>
    </div>
  )
}

export default BusinessSignUP;