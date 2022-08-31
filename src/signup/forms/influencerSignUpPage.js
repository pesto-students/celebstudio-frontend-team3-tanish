import React, { useState } from 'react';
import '../css/influencerSignup.css';
import influencer from '../influencer.PNG';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const InfluencerSignUP = () => {
  const navigate = useNavigate();
  const [displayStatus, setDispalyStatus] = useState("");
  const [formDetails,setFormDetails] = useState({fname:'',lname: '',cno:'', email: '', password: ''});
  const token = "justForFun"
  const request = {
    method:'post',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:'https://celebackend.herokuapp.com/users/signup/influencer/',
    data: formDetails,
  }

  const setChange = (event) => {
    setDispalyStatus("");
    const {name,value} = event.target;
    setFormDetails({...formDetails, [name]:value, });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("sending details to backend for processing");
    axios(request)
    .then((res) => {
      
      if(res.status === 201 && res.data.status === 'success'){
        setDispalyStatus("success");
        setTimeout(() => {setDispalyStatus("");navigate('/signup')},1000);
      }
      else{
        setDispalyStatus("failed")
      }
    })
    .catch((err) => {console.log(err)})
    
  }
  return (
    <div className='IScontainer'>
      {displayStatus === 'success' ? 
      <div className='responseStatus'>
        Login Successfull!! Redirecting to login Page.
      </div>:null}

      {displayStatus === 'failed' ? 
      <div className='responseStatus'>
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