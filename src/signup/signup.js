import React, { useState } from 'react';
import './css/signup.css';
import { useNavigate } from 'react-router-dom';
import { getTOKEN,setData,setUserID,setUserType } from './authSlice';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';


const Signup = (props) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const user = useSelector(state => state.authDetails.userData)
  const token = useSelector(state => state.authDetails.token)
  const [userType,handleUserType] = useState("");
  const [useLogin,setuseLogin] = useState({
    password:'',
    email:'',
  })


  const request = {
    method:'post',
    header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
    url:'https://celebackend.herokuapp.com/api/v1/login',
    data: useLogin,
  }
  const handleChange = (event) => {
   const utype = event.target.value;
   handleUserType(utype);
  }

    const setChange = (event) => {
      const {name,value} = event.target;
      setuseLogin({...useLogin, [name]:value});
    }

    const handleLogin = async (event) => {
      event.preventDefault();
      //console.log(request.data);
      await axios(request)
      .then((res) => {
        //console.log(res);
        let userData = res.data.user;
        let token = res.data.token;
        let userId = res.data.user._id;
        let userType = res.data.user_type;
       // console.log(userData, token, userId, userType);
       
        if(res.data.status === 'success' && res.data.user_type === 'Influencer'){
        //  console.log(res.data);
          dispatch(getTOKEN(token))
          dispatch(setData(userData));
          dispatch(setUserID(userId));
          dispatch(setUserType(userType));
          
         
          navigate('/idashboard');
        }
        else if(res.data.status === 'success' && res.data.user_type === 'Business'){
          dispatch(getTOKEN(token))
          dispatch(setData(userData));
          dispatch(setUserID(userId));
          dispatch(setUserType(userType));
          navigate('/bdashboard');
        }
        else{
          console.log("something went wrong");
        }
      })
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
                <input type="radio" value="business" name="user-type" onChange={handleChange}/> Business {'\u00A0'}{'\u00A0'}
                <input type="radio" value="influencer" name="user-type" onChange={handleChange}/> Influencer
              </div>
            </div>
          <button className='button' onClick={() => {navigate(`/signup/${userType}`)}}>Click here to proceed!</button>
          <hr/>
          <div>
            <form onSubmit={handleLogin}>
              <h3>Already a user</h3>
              <input className='loginInput' required type='text' placeholder='E-mail' name="email" value={useLogin.value} onChange={setChange} /><br/>
              <input className='loginInput' required type='password' placeholder='password' name="password" value={useLogin.value} onChange={setChange} /><br/>
              <button className='button' type='submit'>Login</button>
            </form>
          </div>   
      </div>
    </div>
  )
}

export default Signup;