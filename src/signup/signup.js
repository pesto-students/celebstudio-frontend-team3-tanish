import React, { useState } from 'react';
import './css/signup.css';
import { useNavigate } from 'react-router-dom';
import { getTOKEN,setData,setUserID,setUserType } from './authSlice';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';


const Signup = (props) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, errorMessage] = useState("");
 
  const user = useSelector(state => state.authDetails.userData)
  const token = useSelector(state => state.authDetails.token);
  const [displayStatus, setDispalyStatus] = useState();
  const [errMsg, setErrmsg] = useState("");
  const [userType,handleUserType] = useState("");
  const [useLogin,setuseLogin] = useState({
    password:'',
    email:'',
  })


 
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

      const request = {
        method:'post',
        header:('Content-Type: application/json',`Authorization: Bearer ${token}`),
        url:'https://celebackend.herokuapp.com/api/v1/login',
        data: useLogin,
      }
      await axios(request)
      .then((res) => {
        //console.log(res);
        setDispalyStatus("success");
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
      .catch((err) => {
        setDispalyStatus('failed');
        setErrmsg( err.response.data.message);
        console.log(errorMessage)})
    }
   
  
  return (
    <div className='Signupbody'>
      <div className='signcelebstudio'>Celebstudio</div>
      <div className='signContainer'>
          <h1>Sign into your Account</h1>
          {displayStatus === 'success' ? 
          <div className='responseStatus signupsuccess'>
            Login Successfulll!! Redirecting to login Page.
          </div>:null}
          {displayStatus === 'failed' ? 
          <div className='responseStatus signupfailed'>
            {errMsg}
          </div>:null}
          
          


        <div className='signupContainer'>
          <div className='signupBody'>
          <div className='signupDesc'>If you do not have an account<br/>create a new account</div>
            <h2 className='continueAs'>Continue as</h2>
            <div className='buttonSet'>
              <div className="switch">
                <input type="radio" value="business" name="user-type" onChange={handleChange}/> Business {'\u00A0'}{'\u00A0'}
                <input type="radio" value="influencer" name="user-type" onChange={handleChange}/> Influencer
              </div>
              <button className='signupbutton' onClick={() => {navigate(`/signup/${userType}`)}}>Click here to proceed!</button>

          </div>
          <div className='lineSignup'></div>

          </div>
          <div className='loginBody'>
          <form onSubmit={handleLogin}>
              <h3>Already a user</h3>
              <input className='loginInput' required type='text' placeholder='E-mail' name="email" value={useLogin.value} onChange={setChange} /><br/>
              <input className='loginInput' required type='password' placeholder='password' name="password" value={useLogin.value} onChange={setChange} /><br/>
              <button className='signupbutton' type='submit'>Login</button>
            </form>

          </div>
    </div>
    </div>
    </div>
  )
}

export default Signup;