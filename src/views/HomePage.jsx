import { useEffect } from "react";
// Imported Context
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Carousel } from "antd";
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

const slides = [
  "Simple UI",
  "Tasks & Activities",
  "Planner & Calendar",
  "Journal & Notes",
  "Filter & Sort",
];

const HomePage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, [auth?.user]);

  return (
    <main className="">
      <div>
        {/* <h1 className="m-0 p-0">Welcome!</h1> */}
        <img
          src="logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="from-zinc-500/30 to-zinc-500/10 bg-gradient-to-br rounded-full p-3 mx-auto hover:scale-125 hover:-rotate-12 duration-100"
        />
        <p className="font-semibold text-2xl text-blue-600">
          Your Daily Adventure Starts Here
        </p>
      </div>
      <div>
        <section className="max-w-[500px] overflow-hidden">
          <Carousel autoplay autoplaySpeed={3000}>
            {slides.map((item, index) => {
              return (
                <div key={index}>
                  <div
                    className="bg-gradient-to-br from-sky-500 to-sky-800 text-white text-4xl h-[300px] font-bold text-center"
                    style={{ lineHeight: "200px" }}
                  >
                    {item}
                  </div>
                </div>
              );
            })}
          </Carousel>
        </section>
        <div className="flex items-center flex-1 justify-center gap-2 my-10">
          <Button type="link" style={{ padding: 0 }}>
            <Link to="/login">Sign in</Link>
          </Button>
          <span>or</span>
          <Button type="primary">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
