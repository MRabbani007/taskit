import { useContext, useEffect } from "react";
// Imported Context
import { GlobalContext } from "../context/GlobalState";
import useAuth from "../hooks/useAuth";
import { MdOutlineNextPlan } from "react-icons/md";
import { TbProgressCheck, TbProgressHelp, TbProgressX } from "react-icons/tb";
import { FaCircle } from "react-icons/fa6";
import { IMAGES_Icons } from "../data/templates";
import { useNavigate } from "react-router-dom";
// Imported Components

const HomePage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, [auth]);

  return (
    <div className="flex flex-wrap flex-1 gap-3 justify-center">Welcome!</div>
  );
};

export default HomePage;
