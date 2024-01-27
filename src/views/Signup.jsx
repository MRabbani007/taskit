import React, { useState } from "react";
import { ACTIONS, fetchUser } from "../data/serverFunctions";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    let response = "";
    if (userName === "") {
      alert("Enter UserName");
    } else if (password === "") {
      alert("Enter Password");
    } else {
      response = await fetchUser({
        type: ACTIONS.SIGNUP,
        username: userName,
        password: password,
      });
      alert(response);
      if (response === "accepted") {
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="text-slate-950 pt-[50px] flex flex-col items-center justify-center min-h-screen">
        <form
          action=""
          className="flex flex-col border-2 border-yellow-400 p-5"
          onSubmit={handleSignup}
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
          <button type="submit" className="btn btn-blue mx-auto my-2">
            Signup
          </button>
        </form>
        <span>Have an account?</span>
        <Link to="/signin" className="btn btn-yellow">
          Signin
        </Link>
      </div>
    </>
  );
};

export default Signup;
