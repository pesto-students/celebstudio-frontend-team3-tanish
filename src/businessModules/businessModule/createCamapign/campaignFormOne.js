import React, { useRef, useState } from "react";
import "../../businessModule.css";
import info from "../../../img/info.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../loader/loader";
import empty from "../../../img/empty.png";

const CampaignFormOne = (props) => {
  const navigate = useNavigate();
  const userID = useSelector((state) => state.authDetails.userID);
  const token = useSelector((state) => state.authDetails.token);
  const userType = useSelector((state) => state.authDetails.userType);
  const [isLoading, setIsLoading] = useState(false);
  const objectiveRef = useRef();
  const nameRef = useRef();
  const descRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const PCRef = useRef();
  const followerRef = useRef();
  const platformRef = useRef();
  const costRef = useRef();

  const [successMsg, setsuccessMsg] = useState("");
  const [campaign, setCampaing] = useState({
    name: String,
    start_date: String,
    end_date: String,
    budget: String,
    product_category: String,
    description: String,
    campaign_objective: String,
    platform: String,
    followers_count: String,
    business_id: userID,
  });

  const request = {
    method: "post",
    header:
      ("Content-Type: application/json", `Authorization: Bearer ${token}`),
    url: "https://celebackend.herokuapp.com/api/v1/newcampaign",
    data: campaign,
  };

  const setChange = (event) => {
    const { name, value } = event.target;
    setCampaing({ ...campaign, [name]: value });
  };

  const setEndDate = (event) => {
    const { name, value } = event.target;
    const start = campaign.start_date.split("-");
    const end = event.target.value.split("-");
    if (start[0] > end[0]) {
      console.log("START YEAR GREATER THEN END YEAR");
      alert("Start date should be greater then end data");
      return;
    } else if (start[0] < end[0]) {
      console.log("START YEAR LESS THEN END YEAR");
      setCampaing({ ...campaign, [name]: value });
    } else if (start[0] === end[0]) {
      console.log("START YEAR EQUAL THEN END YEAR");
      if (start[1] > end[1]) {
        console.log("START MONTH GREATER THEN END MONTH");
        alert("Start date cannot be greater then end date");
        return;
      } else if (start[1] < end[1]) {
        setCampaing({ ...campaign, [name]: value });
      } else if (start[1] === end[1] && start[2] > end[2]) {
        alert("Start date cannot be greater then end date");
      } else if (start[1] === end[1] && start[2] < end[2]) {
        setCampaing({ ...campaign, [name]: value });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (campaign.campaign_objective.length <= 1) {
      alert("Campaign Objective cannot be empty");
      //objectiveRef.current.focus();
      return;
    }

    if (campaign.name.length <= 1) {
      alert("Campaign Name cannot be empty");
      nameRef.current.focus();
      return;
    }

    if (campaign.description.length <= 1) {
      alert("Camapign description cannot be empty");
      descRef.current.focus();
      return;
    }

    if (typeof campaign.product_category == "function") {
      alert("produc catotgory cannot be empty");
      PCRef.current.focus();
      return;
    }

    if (campaign.start_date.length <= 1) {
      alert("start date cannot be empty");
      startRef.current.focus();
      return;
    }

    if (campaign.end_date.length <= 1) {
      alert("End date cannot be empty");
      endRef.current.focus();
      return;
    }

    const start = campaign.start_date.split("-");
    const end = campaign.end_date.split("-");

    if (start[0] > end[0]) {
      console.log("START YEAR GREATER THEN END YEAR");
      alert("Start date should be greater then end data");
      startRef.current.focus();
      return;
    } else if (start[0] < end[0]) {
      console.log("START YEAR LESS THEN END YEAR");
    } else if (start[0] === end[0]) {
      console.log("START YEAR EQUAL THEN END YEAR");
      if (start[1] > end[1]) {
        console.log("START MONTH GREATER THEN END MONTH");
        alert("Start date cannot be greater then end date");
        return;
      } else if (start[1] < end[1]) {
        console.log("everything ok");
      } else if (start[1] === end[1] && start[2] > end[2]) {
        alert("Start date cannot be greater then end date");
        return;
      } else if (start[1] === end[1] && start[2] < end[2]) {
        console.log("everything is ok");
      }
    }

    if (campaign.budget.length <= 1) {
      alert("budget cannot be empty");
      costRef.current.focus();
      return;
    }

    if (campaign.followers_count.length <= 1) {
      alert("follower count cannot be empty");
      followerRef.current.focus();
      return;
    }
    console.log(campaign.platform.length);
    if (typeof campaign.platform == "function") {
      alert("platform cannot be empty");
      platformRef.current.focus();
      return;
    }

    setIsLoading(true);

    axios(request)
      .then((res) => {
        setsuccessMsg("success");
        setIsLoading(false);
        navigate("/bdashboard");
      })
      .catch((err) => {
        setsuccessMsg("failed");
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? <LoadingSpinner /> : null}
      <div className="CreateCampaing">
        <div className="CCleft">
          <form>
            <div className="CCobjective">
              <h2>What's your objective?</h2>
              <button
                className={
                  campaign.campaign_objective === "acquiring"
                    ? "campType opted"
                    : "campType"
                }
                onClick={() => {
                  setCampaing({ ...campaign, campaign_objective: "acquiring" });
                }}
              >
                Acquiring customer
              </button>
              <button
                className={
                  campaign.campaign_objective === "awareness"
                    ? "campType opted"
                    : "campType"
                }
                onClick={() => {
                  setCampaing({ ...campaign, campaign_objective: "awareness" });
                }}
              >
                Brand Awareness
              </button>
              <div className="lineCC"></div>
            </div>
            <div className="CCname">
              <h2> Campaign Name</h2>
              <br />
              <input
                type="text"
                ref={nameRef}
                name="name"
                value={campaign.value}
                required
                onChange={setChange}
                placeholder="campaignName"
              />

              <h2>Campaign Description</h2>
              <br />
              <textarea
                name="description"
                ref={descRef}
                required
                rows={6}
                cols={50}
                value={campaign.value}
                onChange={setChange}
                placeholder="Campaign Desc"
              />
              <div className="lineCC"></div>
            </div>
            <div className="CCprodCat">
              <h2>Product category</h2>
              <br />
              <select
                name="product_category"
                ref={PCRef}
                defaultValue={"default"}
                value={campaign.value}
                onChange={setChange}
              >
                <option value="default">
                  Please select a Product category
                </option>
                <option value="1">Fashion & Apparel </option>
                <option value="2">Food & Beverages </option>
                <option value="3">Health & Wellness </option>
                <option value="4"> Pets </option>
                <option value="5">Beauty </option>
                <option value="6">Jewellery & Accessories</option>
              </select>
              <div className="lineCC"></div>
            </div>
            <div className="CCdata">
              <h2>Start Date</h2>
              <input
                type="date"
                ref={startRef}
                name="start_date"
                required
                value={campaign.value}
                onChange={setChange}
              />
              <h2>End Date</h2>
              <input
                type="date"
                ref={endRef}
                name="end_date"
                required
                value={campaign.value}
                onChange={setEndDate}
              />
              <div className="lineCC"></div>
            </div>
            <div className="CCfcount">
              <h2>Please Select a platform</h2>
              <br />
              <select
                name="platform"
                ref={platformRef}
                defaultValue={"default"}
                value={campaign.value}
                onChange={setChange}
              >
                <option value="default">Please select a platform</option>
                <option value="facebook">Facebook </option>
                <option value="instagram">Instagram </option>
                <option value="twitter">twitter </option>
              </select>

              <h2>How many followers will the influencer have?</h2>
              <input
                type="number"
                ref={followerRef}
                name="followers_count"
                required
                value={campaign.value}
                onChange={setChange}
              />

              <h2>What is your budget per influencer?</h2>
              <input
                type="number"
                ref={costRef}
                name="budget"
                required
                value={campaign.value}
                onChange={setChange}
              />
            </div>

            <div className="buttonS">
              {" "}
              <button type="submit" className="campType" onClick={handleSubmit}>
                Create Campaign
              </button>
            </div>
          </form>
        </div>
        <div className="responseMsg">
          {successMsg === "success" ? (
            <div className="success">Campaign Creation successfull!!</div>
          ) : null}
          {successMsg === "failed" ? (
            <div className="failed">
              Something went wrong. Please try again or contact customer care
            </div>
          ) : null}
        </div>

        <div className="CCright">
          <div className="CCrightContainer">
            <img src={info} alt="information" />
            {campaign.campaign_objective.length === 1 ? (
              <div>
                <p>
                  <b>Acquire Customer</b>
                  <br /> These campaigns are best suited for brands which has
                  developed customers, And those who wish to increase there
                  sales. Influnencer can be considered as affiliate who will
                  help you increse your sales.
                  <br />
                  <br />
                  <b>Brand Awareness</b>
                  <br /> These campaigns are best suited for brand who wish to
                  develop customers. Create product awarenesss amongst the
                  targeted auidence of the user.
                </p>
              </div>
            ) : (
              <div>
                {campaign.campaign_objective === "acquire" ? (
                  <div>
                    <b>Acquire Customer</b> Best for brands with developed
                    audiance
                  </div>
                ) : null}
                {campaign.campaign_objective === "aware" ? (
                  <div>
                    <b>Brand Awareness</b> Best for brands new to market.
                  </div>
                ) : null}
                {campaign.name.length < 10 ? (
                  <p>
                    <b>Camapign Name</b> Please enter a name for your camapaig
                  </p>
                ) : (
                  <p>
                    <b>Camapign Name</b> Great name for your campaign
                  </p>
                )}
                {campaign.description.length < 100 ? (
                  <p>
                    <b>Camapign Description</b> Write a short description for
                    your campaign. This will help influncers understand the
                    objective clearly. you can shre your product link along with
                    hashtag that you want for the camapign
                  </p>
                ) : (
                  <p>
                    <b>Camapign Description</b>
                    Amazing!! Your influencers will be delighted to see your
                    product.
                  </p>
                )}
                {campaign.product_category === 1 ? (
                  <p>
                    <b>Primary category</b> Select your product category
                  </p>
                ) : (
                  <p>
                    <b>Primary category</b> Celebstudio will match influencer
                    who have primary product category set to the one you have
                    selected.
                  </p>
                )}
                {campaign.start_date === 1 ? (
                  <p>
                    <b>Start date</b> start date of your campaign
                  </p>
                ) : (
                  <p>
                    <b>Start date</b>Your campaign will start from{" "}
                    {campaign.start_date}.
                  </p>
                )}
                {campaign.end_date === 1 ? (
                  <p>
                    <b>End date</b> End date for your campaign
                  </p>
                ) : (
                  <p>
                    <b>End date</b>Your campaign will start from{" "}
                    {campaign.end_date}.
                  </p>
                )}
                <b>***Product Category, Platform,Follower Count,Budget </b>{" "}
                cannot be changed after creating the campaing.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignFormOne;
