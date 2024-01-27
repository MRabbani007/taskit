import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./views/HomePage";
import Navbar from "./components/Navbar";
import Signin from "./views/Signin";
import Signup from "./views/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
