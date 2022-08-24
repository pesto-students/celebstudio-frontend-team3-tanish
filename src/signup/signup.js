import React, { useState } from 'react';
import './css/signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getTOKEN } from './authSlice';

const Signup = (props) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userType,setUserType] = useState("");
  const [useLogin,setuseLogin] = useState({
    userid:'',
    password:'',
  })
  console.log(props);
  const request = {
    method:'post',
    header:'application/json',
    url:'http://localhost:8000/signup/influencer',
    data: useLogin,
  }

  const handleChange = (event) => {
   const utype = event.target.value;
   setUserType(utype);
  }

    const setChange = (event) => {
      const {name,value} = event.target;
      setuseLogin({...useLogin, [name]:value});
    }

    const handleLogin = (event) => {
      event.preventDefault();
      axios.post(request)
      .then((res) => {  dispatch(getTOKEN(res.json())) })
      .catch((err) => {console.log(err);})
    }
   
  
  return (
    <div className='Signupbody'>
      <div className='signcelebstudio'>Celebstudio</div>
        <div className='signupContainer'>
          <h1>Sign into your Account</h1>
          <div className='signupDesc'>If you do not have an account, sign up to create a fresh new account</div>
            <h2 className='continueAs'>Continue as</h2>
            <div className='buttonSet'>
              <div className="switch">
                <input type="radio" value="business" name="user-type" onChange={handleChange}/> Business
                <input type="radio" value="influencer" name="user-type" onChange={handleChange}/> Influencer
              </div>
            </div>
          <button className='button' onClick={() => {navigate(`/signup/${userType}`)}}>Click here to proceed!</button>
          <hr/>
          <div>
            <form onSubmit={handleLogin}>
              <h3>Already a user</h3>
              <input className='loginInput' required type='text' placeholder='userId' name="userid" value={useLogin.value} onChange={setChange} /><br/>
              <input className='loginInput' required type='password' placeholder='password' name="password" value={useLogin.value} onChange={setChange} /><br/>
              <button className='button' type='submit'>Login</button>
            </form>
          </div>   
      </div>
    </div>
  )
}

export default Signup;