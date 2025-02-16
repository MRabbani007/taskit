import { useEffect } from "react";
// Imported Context
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Carousel } from "antd";
import HomePageHero from "@/features/website/HomePageHero";
import HomePageAbout from "@/features/website/HomePageAbout";
import HomePageServices from "@/features/website/HomePageServices";
// import "antd/dist/reset.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Logo from "logo.png";
// Imported Components

const contentStyle = {
  height: "300px",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
};

// "Simple", "Fast", "Easy"

const HomePage = () => {
  return (
    <main className="">
      <HomePageHero />
      <HomePageServices />
      <HomePageAbout />
    </main>
  );
};

export default HomePage;
