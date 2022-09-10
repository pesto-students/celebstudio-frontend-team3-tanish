import React, { useState } from 'react';
import '../css/businessSignup.css';
import axios from 'axios';
import {BsArrowRight} from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BusinessSignUP = () => {
  const redirect = () => {setTimeout(() => {setDispalyStatus("");navigate('/signup');clearTimeout(redirect)},3000)};
  console.log(typeof(redirect));
  const [displayStatus, setDispalyStatus] = useState("");
  const navigate = useNavigate();
  const [formDetails,setFormDetails] = useState({fname:'',lname: '', cname: '', curl: '', email: '', password: ''});
  const select = useSelector(((state) => state.authDetails.token));
  const token = select;
  const request = {
    method:'post',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:'https://celebackend.herokuapp.com/api/v1/signup/business/',
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
  
    <div className='businessSignUp'>
      {displayStatus === 'success' ? 
      <div className='responseStatus signupsuccess'>
        Login Successfull!! Redirecting to login Page.
      </div>:null}

      {displayStatus === 'failed' ? 
      <div className='responseStatus signupfailed'>
        Something went wrong:(. Please try again
      </div>:null}
    <form className='bfrom' onSubmit={handleSubmit}>
        <div className='cS'>CelebStudio</div> 
        <div className='businessInput'> 
        <label>First Name</label><br/>
        <input type="text" name="fname" className='bforminput' placeholder="Your name.." required value={formDetails.value} onChange={setChange}/>
        </div>
        <div className='businessInput'>
        <label >Last Name</label><br/>
        <input type="text" name="lname" className='bforminput' placeholder="Your last name.." required value={formDetails.value} onChange={setChange}/>
        </div>  
        <div className='businessInput'>
        <label >Company Name</label><br/>
        <input type="text" name="cname" className='bforminput' placeholder="Company.." required value={formDetails.value} onChange={setChange}/>
        </div>
        <div className='businessInput'>
        <label >Company Url</label><br/>
        <input type="text" name="curl" className='bforminput' placeholder="company url.." required value={formDetails.value} onChange={setChange}/>
        </div>
        <div className='businessInput'>
        <label > E-mail</label><br/>
        <input type="email" name="email" className='bforminput' placeholder="email.." required value={formDetails.value} onChange={setChange} />
        </div>
        <div className='businessInput'>
        <label >Password</label><br/>
        <input type="password" name="password" className='bforminput' placeholder="Your password.." required value={formDetails.value} onChange={setChange} />
        </div>
      <div className='buttonb'><button type='submit' className='businessSubmit'>Continue <span className='arrowIcon'><BsArrowRight/></span></button></div>
    </form>
  </div>
  )
}

export default BusinessSignUP;