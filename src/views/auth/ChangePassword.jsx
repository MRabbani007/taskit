import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Imported Hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
// Imported Data
import { SERVER } from "../../data/actions";
// Imported Icons
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ChangePassword = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [currentPwd, setCurrentPwd] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // on change remove error message
  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = PWD_REGEX.test(pwd);
    if (!v1) {
      setErrMsg("Invalid Entry");
    } else {
      try {
        const response = await axiosPrivate.post(SERVER.USER_PWD, {
          roles: auth?.roles,
          action: {
            type: "pwd",
            payload: {
              password: currentPwd,
              username: auth?.user,
              newPassword: pwd,
            },
          },
        });
        console.log(response.data);
        if (response?.data?.status === "success") {
          //clear state and controlled inputs
          //need value attrib on inputs for this
          setCurrentPwd("");
          setPwd("");
          setMatchPwd("");
          navigate(from, { replace: true });
          navigate("/settings", { state: { username: auth?.user } });
        } else {
          alert(response);
        }
        console.log("first");
      } catch (error) {
        if (!error?.response) {
          setErrMsg("No Server Response");
        } else {
          setErrMsg("Failed to change password");
        }
      }
    }
  };

  const handleCancel = () => {
    setCurrentPwd("");
    setPwd("");
    setMatchPwd("");
    navigate("/settings");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center max-w-xl mx-auto gap-2"
    >
      <h1>Change Password</h1>
      <label htmlFor="currentPassword">Current Password</label>
      <input
        id="currentPassword"
        type="password"
        placeholder="Current Password"
        value={currentPwd}
        onChange={(e) => setCurrentPwd(e.target.value)}
      />
      <label htmlFor="password">
        New Password
        <CiSquareCheck className={validPwd ? "valid" : "hide"} />
        <CiSquareRemove className={validPwd || !pwd ? "hide" : "invalid"} />
      </label>
      <input
        id="password"
        type="password"
        placeholder="New Password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      <label htmlFor="matchPassword">
        Re-Enter New Password
        <CiSquareCheck className={validMatch && matchPwd ? "valid" : "hide"} />
        <CiSquareRemove
          className={validMatch || !matchPwd ? "hide" : "invalid"}
        />
      </label>
      <input
        id="matchPassword"
        type="password"
        placeholder="Re-Enter New Password"
        value={matchPwd}
        onChange={(e) => setMatchPwd(e.target.value)}
      />
      <button type="submit" className="btn btn-red">
        Submit
      </button>
      <button onClick={handleCancel} className="btn btn-blue">
        Cancel
      </button>
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
    </form>
  );
};

export default ChangePassword;
