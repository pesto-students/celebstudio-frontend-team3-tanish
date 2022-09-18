import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Navbar from "../../navbar/bnavbar";
import CampaignFormOne from "./campaignFormOne";

const CreateCampaign = () => {
  const userID = useSelector((state) => state.authDetails.userID);
  const token = useSelector((state) => state.authDetails.token);
  const userType = useSelector((state) => state.authDetails.userType);

  return (
    <>
      {token.length > 1 && userID.length > 1 && userType === "Business" ? (
        <>
          <div className="Idashboard">
            <Navbar children={<CampaignFormOne id={userID} token={token} />} />
          </div>
        </>
      ) : (
        <>
          <Navigate to="/" />
        </>
      )}
    </>
  );
};

export default CreateCampaign;
