import React, { useState } from "react";
import { ACTIONS, fetchUser } from "../data/serverFunctions";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    let response = "";
    if (userName === "") {
      alert("Enter UserName");
    } else if (password === "") {
      alert("Enter Password");
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

  return (
    <>
      <Navbar />
      <div className="text-slate-950 pt-[50px] flex flex-col items-center justify-center min-h-screen">
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
          <button type="submit" className="btn btn-yellow mx-auto my-2">
            Signin
          </button>
        </form>
        <span>Create new account</span>
        <Link to="/signup" className="btn btn-blue">
          Signup
        </Link>
      </div>
    </>
  );
};

export default Signin;
