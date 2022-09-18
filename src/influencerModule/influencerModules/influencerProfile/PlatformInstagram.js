import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../loader/loader";
import { setData } from "../../../signup/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlatformInstagram = () => {
  const dispath = useDispatch();
  const token = useSelector((state) => state.authDetails.token);
  const userID = useSelector((state) => state.authDetails.userID);
  const userData = useSelector((state) => state.authDetails.userData.instagram);
  const [instagram, setInstagram] = useState(userData);
  const [URL, setURL] = useState("");
  const [FCOUNT, setFCOUNT] = useState("");
  const [COST, setCOST] = useState("");
  const [showEditForm, handleShowEditForm] = useState();
  let user = useSelector((state) => state.authDetails.userData);
  const [isLoading, setIsLoading] = useState(false);

  let clearLoader = () => {
    setTimeout(() => {
      setIsLoading(false);
      clearTimeout(clearLoader);
    }, 10000);
  };
  useEffect(() => {
    if (isLoading) {
      clearLoader();
    } else {
      clearTimeout(clearLoader);
    }
  }, [isLoading]);

  const requestProfile = {
    method: "patch",
    header:
      ("Content-Type: application/json", `Authorization: Bearer ${token}`),
    url: ` https://celebackend.herokuapp.com/api/v1/influencer/${userID}`,
  };

  const handleURLchange = (event) => {
    setURL(event.target.value);
  };

  const handleFcountchange = (event) => {
    setFCOUNT(event.target.value);
  };

  const handleCostchange = (event) => {
    setCOST(event.target.value);
  };

  const handleCancel = (event) => {
    handleShowEditForm(false);
    setURL("");
    setFCOUNT("");
    setCOST("");
  };

  //checking instagram status from redux. if active, then setShowFecbookedit is set to true which
  const handleFacebookUpdate = (event) => {
    event.preventDefault();

    if (!URL || !FCOUNT || !COST) {
      alert("you left a field empty");
      setURL("");
      setFCOUNT("");
      setCOST("");
      return;
    }

    setInstagram({
      ...instagram,
      isactive: true,
      url: URL,
      follower_count: FCOUNT,
      cost: COST,
    });

    const instagramRequest = {
      ...requestProfile,
      data: {
        instagram: {
          isactive: true,
          url: URL,
          follower_count: FCOUNT,
          cost: COST,
        },
      },
    };
    console.log(instagramRequest);
    setIsLoading(true);
    axios(instagramRequest)
      .then((res) => {
        console.log(res.data.data);
        toast.success("Instagram update successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        let data = res.data.data.profile;
        dispath(setData(data));
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Instagram update failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      });
    setURL("");
    setFCOUNT("");
    setCOST("");
    handleShowEditForm(!showEditForm);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="personalDetails">
          {instagram.isactive ? (
            <div className="pdetails platformContainer">
              <div
                className="ChangePassword"
                onClick={() => {
                  handleShowEditForm(!showEditForm);
                }}
              >
                Change instagram details
              </div>
              {!showEditForm ? (
                <div>
                  <div className="pdetails platform">
                    <label>ProfileUrl</label> <br />
                    <div className="PDdisplay">{instagram.url}</div>
                    <br />
                    <label>FollowerCount</label>
                    <br />
                    <div className="PDdisplay">{instagram.follower_count}</div>
                    <br />
                    <label>Post COST</label> <br />
                    <div className="PDdisplay">{instagram.cost}</div>
                    <br />
                  </div>
                </div>
              ) : (
                <div className="pdetails platform">
                  <form onSubmit={handleFacebookUpdate}>
                    <label>ProfileUrl</label> <br />
                    <input type="text" onChange={handleURLchange} />
                    <br />
                    <label>FollowerCount</label>
                    <br />
                    <input type="text" onChange={handleFcountchange} />
                    <br />
                    <label>Post COST</label> <br />
                    <input type="text" onChange={handleCostchange} />
                    <button type="submit" className="profileEditButton update">
                      Submit
                    </button>
                    <br />
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="pdetails platformContainer">
              <div
                className="ChangePassword"
                onClick={() => {
                  handleShowEditForm(!showEditForm);
                }}
              >
                Add Instagram
              </div>
              {showEditForm ? (
                <div className="pdetails platform">
                  <form onSubmit={handleFacebookUpdate}>
                    <label>ProfileUrl</label> <br />
                    <input type="text" onChange={handleURLchange} />
                    <br />
                    <label>FollowerCount</label>
                    <br />
                    <input type="text" onChange={handleFcountchange} />
                    <br />
                    <label>Post COST</label> <br />
                    <input type="text" onChange={handleCostchange} />
                    <button type="submit" className="profileEditButton update">
                      Submit
                    </button>
                    <br />
                    <button
                      className="profileEditButton cancle"
                      onClick={() => {
                        handleCancel();
                      }}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          )}
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default PlatformInstagram;
