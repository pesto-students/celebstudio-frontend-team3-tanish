import React, { useState } from "react";
import "./css/signup.css";
import { useNavigate } from "react-router-dom";
import { getTOKEN, setData, setUserID, setUserType } from "./authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../loader/loader";
import { toast, ToastContainer } from "react-toastify";

const Signup = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, errorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.authDetails.userData);
  const token = useSelector((state) => state.authDetails.token);
  const [displayStatus, setDispalyStatus] = useState();
  const [errMsg, setErrmsg] = useState("");
  const [userType, handleUserType] = useState("");
  const [useLogin, setuseLogin] = useState({
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    const utype = event.target.value;
    handleUserType(utype);
  };

  const setChange = (event) => {
    const { name, value } = event.target;
    setuseLogin({ ...useLogin, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    //console.log(request.data);
    setDispalyStatus();

    const request = {
      method: "post",
      header:
        ("Content-Type: application/json", `Authorization: Bearer ${token}`),
      url: "https://celebackend.herokuapp.com/api/v1/login",
      data: useLogin,
    };
    await axios(request)
      .then((res) => {
        //console.log(res);
        setDispalyStatus("success");
        let userData = res.data.user;
        let token = res.data.token;
        let userId = res.data.user._id;
        let userType = res.data.user_type;
        // console.log(userData, token, userId, userType);

        if (
          res.data.status === "success" &&
          res.data.user_type === "Influencer"
        ) {
          //  console.log(res.data);
          dispatch(getTOKEN(token));
          dispatch(setData(userData));
          dispatch(setUserID(userId));
          dispatch(setUserType(userType));

          navigate("/idashboard");
        } else if (
          res.data.status === "success" &&
          res.data.user_type === "Business"
        ) {
          dispatch(getTOKEN(token));
          dispatch(setData(userData));
          dispatch(setUserID(userId));
          dispatch(setUserType(userType));
          navigate("/bdashboard");
        } else {
          console.log("something went wrong");
        }
      })
      .catch((err) => {
        setDispalyStatus("failed");
        setErrmsg(err.response.data.message);
        console.log(errorMessage);
      });
  };

  const handleBusiness = async (event) => {
    setIsLoading(true);
    const request = {
      method: "post",
      header: "Content-Type: application/json",
      url: "https://celebackend.herokuapp.com/api/v1/login",
      data: {
        password: "jitender",
        email: "rajveer@jitkush.com",
      },
    };
    await axios(request)
      .then((res) => {
        setIsLoading(false);
        //console.log(res);
        let userData = res.data.user;
        let token = res.data.token;
        let userId = res.data.user._id;
        let userType = res.data.user_type;
        // console.log(userData, token, userId, userType);

        if (
          res.data.status === "success" &&
          res.data.user_type === "Influencer"
        ) {
          //  console.log(res.data);
          dispatch(getTOKEN(token));
          dispatch(setData(userData));
          dispatch(setUserID(userId));
          dispatch(setUserType(userType));
          navigate("/idashboard");
        } else if (
          res.data.status === "success" &&
          res.data.user_type === "Business"
        ) {
          dispatch(getTOKEN(token));
          dispatch(setData(userData));
          dispatch(setUserID(userId));
          dispatch(setUserType(userType));
          navigate("/bdashboard");
        } else {
          console.log("something went wrong");
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleInfluencer = async (event) => {
    setIsLoading(true);
    toast.info("Login Request sent", {
      position: toast.POSITION.TOP_RIGHT,
    });
    const request = {
      method: "post",
      header: "Content-Type: application/json",
      url: "https://celebackend.herokuapp.com/api/v1/login",
      data: {
        password: "123456",
        email: "influencer@demo.com",
      },
    };
    await axios(request)
      .then((res) => {
        setIsLoading(false);
        //console.log(res);
        let userData = res.data.user;
        let token = res.data.token;
        let userId = res.data.user._id;
        let userType = res.data.user_type;
        // console.log(userData, token, userId, userType);

        if (
          res.data.status === "success" &&
          res.data.user_type === "Influencer"
        ) {
          //  console.log(res.data);
          dispatch(getTOKEN(token));
          dispatch(setData(userData));
          dispatch(setUserID(userId));
          dispatch(setUserType(userType));

          navigate("/idashboard");
        } else if (
          res.data.status === "success" &&
          res.data.user_type === "Business"
        ) {
          dispatch(getTOKEN(token));
          dispatch(setData(userData));
          dispatch(setUserID(userId));
          dispatch(setUserType(userType));
          navigate("/bdashboard");
        } else {
          console.log("something went wrong");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      {isLoading ? <LoadingSpinner /> : null}
      <div className="Signupbody">
        <div className="signcelebstudio">Celebstudio</div>
        <div className="signContainer">
          <div>
            <h2>Demo Login</h2>
            <button className="startedButton" onClick={() => handleBusiness()}>
              Business Dummy Login
            </button>
            {"\u00A0"}
            <button
              className="startedButton"
              onClick={() => handleInfluencer()}
            >
              Influencer Dummy Login
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Signup;
