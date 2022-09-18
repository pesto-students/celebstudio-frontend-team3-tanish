import React, { useRef, useState } from "react";
import "../../businessModule.css";
import info from "../../../img/info.png";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../loader/loader";

const Edit = (props) => {
  const navigate = useNavigate();
  const [successMsg, setsuccessMsg] = useState("");
  const token = useSelector((state) => state.authDetails.token);
  const campDetails = props.data;
  const [campaign, setCampaing] = useState(campDetails);
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef();
  const lastRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  console.log(campaign);

  const request = {
    method: "patch",
    header:
      ("Content-Type: application/json", `Authorization: Bearer ${token}`),
    url: `https://celebackend.herokuapp.com/api/v1/campaign/${campaign._id}`,
    data: campaign,
  };

  const setChange = (event) => {
    const { name, value } = event.target;
    setCampaing({ ...campaign, [name]: value });
    console.log(name, value, typeof value);
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
    const start = campaign.start_date.split("-");
    const end = campaign.end_date.split("-");

    if (!campaign.name) {
      alert("Campaign Name is empty");
      nameRef.current.focus();
      return;
    }

    if (!campaign.description) {
      alert("Camapign description is empty");
      lastRef.current.focus();
      return;
    }

    if (start[0] > end[0]) {
      console.log("START YEAR GREATER THEN END YEAR");
      alert("Start date should be greater then end data");
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
      } else if (start[1] === end[1] && start[2] < end[2]) {
        console.log("everything is ok");
      }
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
        {successMsg === "success" ? (
          <div className="responseMsg success">
            Campaign Creation successfull!!
          </div>
        ) : null}
        {successMsg === "responseMsg failed" ? (
          <div className="failed">
            Something went wrong. Please try again or contact customer care
          </div>
        ) : null}
        <div className="CCleft">
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
              name="name"
              ref={nameRef}
              value={campaign.name}
              onChange={setChange}
              placeholder="campaignName"
            />

            <h2>Campaign Description</h2>
            <br />
            <textarea
              name="description"
              rows={6}
              cols={50}
              ref={lastRef}
              value={campaign.description}
              onChange={setChange}
              placeholder="Campaign Desc"
            />
            <div className="lineCC"></div>
          </div>

          <div className="CCdata">
            <h2>Start Date</h2>
            <input
              type="date"
              name="start_date"
              ref={startRef}
              value={campaign.start_date.slice(0, 10)}
              onChange={setChange}
            />
            <h2>End Date</h2>
            <input
              type="date"
              name="end_date"
              ref={endRef}
              value={campaign.end_date.slice(0, 10)}
              onChange={setEndDate}
            />
            <div className="lineCC"></div>
          </div>

          <div className="buttonS">
            {" "}
            <button className="campType" onClick={handleSubmit}>
              Update Campaign
            </button>
          </div>
        </div>

        <div className="CCright">
          <div className="CCrightContainer">
            <img src={info} alt="information" />
            Edit your campaign
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
