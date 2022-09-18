import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import pIMG from "../../../img/profileimg.PNG";
import Editform from "./inputfield";
import { setData } from "../../../signup/authSlice";
import "../../businessModule.css";
import LoadingSpinner from "../../../loader/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bprofile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authDetails.token);
  const userID = useSelector((state) => state.authDetails.userID);
  const userData = useSelector((state) => state.authDetails.userData);
  // const [fileInputState, setFileInputState] = useState("");
  // const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [showEditButton, setShowEditButton] = useState();
  const [setEdit, updateSetEdit] = useState("");
  const [showPasswordEdit, setshowPasswordEdit] = useState(false);
  //image
  const [addImg, setAddImage] = useState(false);
  const [sendImg, setSendImg] = useState([]);
  const [userImg, setuserImg] = useState();
  const [updatedProfileData, setUpdatedProfileData] = useState(null);

  //personal details
  const [first_name, setFNmae] = useState(userData.first_name);
  const [last_name, setLName] = useState(userData.last_name);
  const [email, setEmail] = useState(userData.email);

  //security
  const [oldpassword, setoldPasswrod] = useState();
  const [newpassword, setNewPassword] = useState([]);
  const [verifypassword, setverifyPassword] = useState([]);

  let clearLoader = () => {
    setTimeout(() => {
      setIsLoading(false);
      clearTimeout(clearLoader);
    }, 10000);
  };
  useEffect(() => {
    if (updatedProfileData === null) {
      return;
    } else {
      dispatch(setData(updatedProfileData));
    }
  }, [updatedProfileData]);

  useEffect(() => {
    if (isLoading) {
      clearLoader();
    } else {
      clearTimeout(clearLoader);
    }
  }, [isLoading]);

  const handleupdateSetEdit = ({ tag }) => {
    updateSetEdit(tag);
  };

  const handleupdateChange = async (data) => {
    if (!data || /^\s*$/.test(data)) {
      updateSetEdit("");
      return;
    }
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    const request = {
      method: "patch",
      header:
        ("Content-Type: application/json", `Authorization: Bearer ${token}`),
      url: `https://celebackend.herokuapp.com/api/v1/business/${userID}`,
    };

    console.log(request);
    setIsLoading(true);
    switch (setEdit) {
      case "first_name": {
        if (specialChars.test(data)) {
          toast.warning("Invalid data type");
          setIsLoading(false);
          return;
        }
        setFNmae(data);
        let firstname = { first_name: data };
        let fnameRequest = { ...request, data: firstname };
        await axios(fnameRequest)
          .then((res) => {
            console.log(res.data.data);
            toast.success("First name changed successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setUpdatedProfileData(res.data.data.profile);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            toast.error("First Name update failed!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setIsLoading(false);
          });
        updateSetEdit("");
        break;
      }

      case "last_name": {
        if (specialChars.test(data)) {
          toast.warning("Invalid data type");
          setIsLoading(false);
          return;
        }
        setLName(data);
        let lastname = { last_name: data };
        let lnameRequest = { ...request, data: lastname };
        await axios(lnameRequest)
          .then((res) => {
            console.log(res.data.data);
            toast.success("Last name changed successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setUpdatedProfileData(res.data.data.profile);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Last Name update failed!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setIsLoading(false);
          });
        updateSetEdit("");
        break;
      }

      case "email": {
        const emailFormate = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
        if (!emailFormate.test(data)) {
          toast.warning("Invalid data type");
          setIsLoading(false);
          return;
        }
        setEmail(data);
        let email = { email: data };
        let emailRequest = { ...request, data: email };
        await axios(emailRequest)
          .then((res) => {
            console.log(res.data.data);
            toast.success("Email changed successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setUpdatedProfileData(res.data.data.profile);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Email update failed!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setIsLoading(false);
          });
        updateSetEdit("");
        break;
      }

      default:
        console.log("something went wrong in handle update change");
    }
  };

  const handleCancleUpdate = () => {
    updateSetEdit("");
  };

  const handlePasswordChange1 = (event) => {
    setoldPasswrod(event.target.value);
  };

  const handlePasswordChange2 = (event) => {
    setNewPassword(event.target.value);
  };

  const handlePasswordChange3 = (event) => {
    setverifyPassword(event.target.value);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!oldpassword || !newpassword || !verifypassword) {
      alert("Please fill in the details");
      updateSetEdit("");
      return;
    }

    const passwordChange = {
      method: "patch",
      header:
        ("Content-Type: application/json", `Authorization: Bearer ${token}`),
      url: `https://celebackend.herokuapp.com/api/v1/business/${userID}/change-password`,
    };

    let password = {
      passwordCurrent: oldpassword,
      password: newpassword,
      passwordConfirm: verifypassword,
    };

    let passwordChangeRequest = { ...passwordChange, data: password };

    axios(passwordChangeRequest)
      .then((res) => {
        //console.log(res.data);
        toast.success("Password change success!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        setshowPasswordEdit(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Password change failed!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      });
  };

  const handleAddImage = (event) => {
    setAddImage(true);
  };

  const handleImgChange = (event) => {
    setSendImg({ ...sendImg, selectedFile: event.target.files[0] });
    console.log(event.target.files[0]);
  };

  const handleimgUpload = (event) => {
    const formData = new FormData();

    console.log(sendImg);

    const imageChange = {
      method: "patch",
      header:
        ("Content-Type: application/json", `Authorization: Bearer ${token}`),
      url: ` https://celebackend.herokuapp.com/api/v1/business/${userID}`,
    };

    formData.append(
      "profileImage",
      sendImg.selectedFile,
      sendImg.selectedFile.name
    );
    const requestPack = { ...imageChange, data: formData };
    axios(requestPack)
      .then((res) => console.log(res))
      .catch((err) => console.oldpassword(err));
    console.log(requestPack);
  };

  return (
    <>
      {isLoading ? <LoadingSpinner /> : null}
      <div className="profileContainer">
        <h2>My Profile</h2>

        <div className="imgtitle">Profile Picture</div>
        <div className="imgContainer">
          <div className="imgSubcontainer">
            <div className="imgDiv">
              {userImg ? userImg : <img src={pIMG} alt="profile" />}
            </div>

            <div className="editbutton">
              <button
                className="imgButton change"
                type="primary"
                onClick={() => {
                  handleAddImage();
                }}
              >
                {" "}
                Change
              </button>
              <button className="imgButton delete" type="primary">
                {" "}
                Delete
              </button>
            </div>
          </div>
          {addImg ? (
            <div className="uplodImg">
              <input type="file" onChange={handleImgChange} />{" "}
              <button
                onClick={() => {
                  handleimgUpload();
                }}
              >
                Upload
              </button>
            </div>
          ) : null}
        </div>

        <div className="imgtitle">Personal Details</div>
        <div className="personalDetails">
          <div
            className="pdetails"
            onMouseOut={() => setShowEditButton()}
            onMouseOver={() => setShowEditButton("first_name")}
          >
            {setEdit !== "first_name" ? (
              <div>
                <label>First Name</label>
                <br />
                <div className="PDdisplay">{first_name}</div>
                {showEditButton === "first_name" ? (
                  <button
                    className="profileEditButton"
                    onClick={() => {
                      handleupdateSetEdit({ tag: "first_name" });
                    }}
                  >
                    Change
                  </button>
                ) : null}
              </div>
            ) : (
              <div>
                <label>First Name</label>
                <div className="PDdiaply">
                  <Editform
                    sendUpdate={handleupdateChange}
                    type={"text"}
                    cancleUpdate={handleCancleUpdate}
                  />
                </div>
              </div>
            )}
          </div>

          <div
            className="pdetails"
            onMouseOut={() => setShowEditButton()}
            onMouseOver={() => setShowEditButton("last_name")}
          >
            {setEdit !== "last_name" ? (
              <div>
                <label>Last Name</label>
                <br />
                <div className="PDdisplay">{last_name}</div>
                {showEditButton === "last_name" ? (
                  <button
                    className="profileEditButton"
                    onClick={() => {
                      handleupdateSetEdit({ tag: "last_name" });
                    }}
                  >
                    Change
                  </button>
                ) : null}
              </div>
            ) : (
              <div>
                <label>Last Name</label>
                <div className="PDdiaply">
                  <Editform
                    sendUpdate={handleupdateChange}
                    type={"text"}
                    cancleUpdate={handleCancleUpdate}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="imgtitle">Contact details</div>
        <div className="personalDetails">
          <div
            className="pdetails"
            onMouseOut={() => setShowEditButton()}
            onMouseOver={() => setShowEditButton("email")}
          >
            {setEdit !== "email" ? (
              <div>
                <label>Email</label>
                <br />
                <div className="PDdisplay">{email}</div>
                {showEditButton === "email" ? (
                  <button
                    className="profileEditButton"
                    onClick={() => {
                      handleupdateSetEdit({ tag: "email" });
                    }}
                  >
                    Change
                  </button>
                ) : null}
              </div>
            ) : (
              <div>
                <label>Email</label>
                <div className="PDdiaply">
                  <Editform
                    sendUpdate={handleupdateChange}
                    type={"email"}
                    cancleUpdate={handleCancleUpdate}
                  />
                </div>
              </div>
            )}
          </div>

          <div
            className="pdetails"
            onMouseOut={() => setShowEditButton()}
            onMouseOver={() => setShowEditButton("contact")}
          ></div>
        </div>

        <div className="imgtitle">Security</div>
        <div
          className="ChangePassword"
          onClick={() => {
            setshowPasswordEdit(!showPasswordEdit);
          }}
        >
          Change Password
        </div>
        {showPasswordEdit ? (
          <div className="pdetails">
            <form onSubmit={handlePasswordSubmit}>
              <label>Old password</label>{" "}
              <div>
                <input
                  type="password"
                  onChange={handlePasswordChange1}
                  required
                />
              </div>
              <label>New Password</label>{" "}
              <div>
                <input
                  type="password"
                  onChange={handlePasswordChange2}
                  required
                />
              </div>
              <label>Verify Password</label>
              <div>
                <input
                  type="password"
                  onChange={handlePasswordChange3}
                  required
                />
                <button type="submit" className="profileEditButton update">
                  Update
                </button>
                <button
                  className="profileEditButton cancle"
                  onClick={() => {
                    setshowPasswordEdit(!showPasswordEdit);
                  }}
                >
                  Cancle
                </button>
              </div>
            </form>
          </div>
        ) : null}
        <ToastContainer />
      </div>
    </>
  );
};

export default Bprofile;
