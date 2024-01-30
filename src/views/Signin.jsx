import React, { useEffect, useState } from "react";
import { ACTIONS, fetchUser } from "../data/serverFunctions";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { genDate } from "../data/utils";

const Signin = () => {
  const [signedinUser, setSignedinUser] = useState("");
  const [todayDate, setTodayDate] = useState(genDate(0));

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    let response = "";
    if (userName === "") {
      setUserNameError("Enter UserName");
    } else if (password === "") {
      setPasswordError("Enter Password");
    } else {
      response = await fetchUser({
        type: ACTIONS.SIGNIN,
        username: userName,
        password: password,
      });
      alert(response);
      if (response === "accepted") {
        localStorage.setItem("todoUser", JSON.stringify(userName));
        navigate("/", { state: { username: userName } });
      }
    }
  };

  const handleSignout = () => {
    removeUser();
  };

  useEffect(() => {
    loaduser();
  }, []);

  const loaduser = () => {
    let data = localStorage.getItem("todoUser");
    if (data) {
      setSignedinUser(JSON.parse(data));
    }
  };

  const removeUser = () => {
    localStorage.removeItem("todoUser");
    setSignedinUser("");
  };

  return (
    <>
      <Navbar />
      <div className="text-slate-950 pt-[50px] flex flex-col items-center justify-center min-h-screen">
        {signedinUser !== "" ? (
          <>
            {/* Header */}
            <div className="m-4">
              <h1 className="">{"Hello, " + signedinUser}</h1>
              <p className="btn btn-yellow my-2">
                {todayDate.day + ", " + todayDate.date + " " + todayDate.month}
              </p>
            </div>
            <button className="btn btn-blue" onClick={handleSignout}>
              Sign Out
            </button>
          </>
        ) : (
          <div>
            <form
              action=""
              className="flex flex-col border-2 border-yellow-400 p-5"
              onSubmit={handleSignin}
            >
              <FaRegUserCircle className="text-[80px] mx-auto mt-3 mb-5" />
              <label htmlFor="username" className="my-2">
                Username
              </label>
              <input
                name="username"
                type="text"
                placeholder="UserName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className=""
              />
              <span className="username-error">{userNameError}</span>
              <label htmlFor="password" className="my-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=""
              />
              <span className="password-error">{passwordError}</span>
              <button type="submit" className="btn btn-yellow mx-auto my-2">
                Signin
              </button>
            </form>
            <p className="">Create account</p>
            <Link to="/signup" className="btn btn-blue">
              Signup
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Signin;
