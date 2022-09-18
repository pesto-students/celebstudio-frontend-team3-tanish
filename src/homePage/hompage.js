import React, { useState } from "react";
import "./homepage.css";
import { BsArrowRight } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getTOKEN, setData, setUserID, setUserType } from "../signup/authSlice";
import LoadingSpinner from "../loader/loader";

const Hompage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = (event) => {
    navigate("/signUp");
  };

  const handleBusiness = async (event) => {
    setIsLoading(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWFkMzA5ZmRkOWFjMDAxNmQ4NmIxYSIsImlhdCI6MTY2MjcwMjQwMiwiZXhwIjoxNjcwNDc4NDAyfQ.g9EKICrUn81y_2BrENP5jsiSPG5A0EWHoyHLew4eKXg";
    const request = {
      method: "post",
      header:
        ("Content-Type: application/json", `Authorization: Bearer ${token}`),
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
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWFkMGRkZmRkOWFjMDAxNmQ4NmIwYyIsImlhdCI6MTY2MjcwMjE1OSwiZXhwIjoxNjcwNDc4MTU5fQ.4B00ZpzO5B8W2oePbtbbDyf81y4jV3lt32bvDBREhQw";
    const request = {
      method: "post",
      header:
        ("Content-Type: application/json", `Authorization: Bearer ${token}`),
      url: "https://celebackend.herokuapp.com/api/v1/login",
      data: {
        password: "jitender",
        email: "carryminati@gmail.com",
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
      <div className="HomePage">
        <header className="header">
          <div className="celebstudio">Celebstudio</div>

          <div className="getStarted">
            <button className="startedButton Main" onClick={handleSignup}>
              Get Started{" "}
              <span className="arrowIcon">
                <BsArrowRight />
              </span>
            </button>
            <button className="startedButton" onClick={() => handleBusiness()}>
              BusinessDummy
            </button>
            <button
              className="startedButton"
              onClick={() => handleInfluencer()}
            >
              InfluencerDummy
            </button>
          </div>
        </header>
        <div className="container">
          <div className="first">
            <div>
              <div className="firstHeader">
                Get customers talking about your brand{" "}
              </div>
              <div className="firstHeader2">
                and buying your product with creator marketing
              </div>
              <div className="firstContent">
                <div className="FCcontent">
                  {" "}
                  <div>
                    <AiFillCheckCircle />{" "}
                  </div>
                  Quickly launch
                  <br />
                  campaign{" "}
                </div>
                <div className="FCcontent">
                  {" "}
                  <div>
                    <AiFillCheckCircle />{" "}
                  </div>
                  Match with <br />
                  creator{" "}
                </div>
                <div className="FCcontent">
                  {" "}
                  <div>
                    <AiFillCheckCircle />{" "}
                  </div>
                  Lisence creator
                  <br /> content
                </div>
              </div>
            </div>
          </div>

          <div className="second">
            <div className="SeconContent">
              <div className="SCcontent">
                Match with creators who love your brand
              </div>
              <div className="SCcontent2">
                <br />
                Stop using search tools. Try Handraise, it finds creators who
                are the top match for your campaign.
                <br />
                <a href="/about">LearnMore</a>
              </div>
            </div>
            <div className="SecondImage">
              <img src="homepage1.PNG" alt="creator"></img>
            </div>
          </div>

          <div className="third">
            <div className="thirdTtile">Run a test campaign today! </div>
            <br />
            <div className="thirdDesc">
              Try a new channel to reach your customers
              <br />
              and grow your business.
              <br />
              <button
                className="getStarted2"
                onClick={() => navigate("/signUp")}
              >
                Get Started{" "}
                <span className="arrowIcon">
                  <BsArrowRight />
                </span>
              </button>
            </div>
          </div>

          <div className="fourth">
            <div className="fourthImage">
              <img src="./homepage2.PNG" alt="canoono" />
            </div>
            <div className="fourthReview">
              <h2>Buy paid social through creator handles</h2>
              Turn content into paid social ads using
              <br />
              the creator's handle—performs better than the ads you're used to.
              <br />
              <hr />
              "With celebStudio, the results have been fantastic. We’ve seen our
              CPA and ROI come in well above the bar, and we’ve seen thousands
              of leads generated."
              <div>
                <br />
                Zang Wang, Marketing Manager,Cononn
              </div>
            </div>
          </div>
          <div>
            <hr />
          </div>

          <footer className="footer">
            <div className="footerDiv">About Us</div>
            <div className="footerDiv">Contact Us</div>
            <div className="footerDiv">Address</div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Hompage;
