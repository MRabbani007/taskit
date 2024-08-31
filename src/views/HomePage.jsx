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

// "Simple", "Fast", "Easy"

const slides = [
  { title: "Tasks", text: "quick add & track" },
  { title: "Activities", text: "a place for your projects" },
  { title: "Routines", text: "repeating tasks" },
  { title: "Planner", text: "organize, plan & action" },
  { title: "Calendar", text: "what's comming up" },
  { title: "Journal", text: "your daily diary" },
  { title: "Notes", text: "fast & simple" },
  { title: "Filters", text: "overview, filter & sort" },
  { title: "Lists", text: "group your tasks" },
];

const HomePage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // if (auth?.user) {
    //   navigate("/dashboard");
    // }
  }, [auth?.user]);

  return (
    <main className="">
      <div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <img
            src="logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="from-zinc-500/30 to-zinc-500/10 bg-gradient-to-br rounded-full p-2 mx-auto hover:scale-125 hover:-rotate-12 duration-100 w-20 h-20"
          />
          <div>
            <h1 className="m-0 p-0 text-2xl uppercase text-sky-700">
              <i>Taskit</i>
            </h1>
            <div className="font-medium text-xl text-blue-600 text-wrap">
              Your Daily Adventure Starts Here
            </div>
          </div>
        </div>
        <div>
          <section className="max-w-[80vw] sm:max-w-[500px] md:max-w-[700px] overflow-hidden">
            <Carousel autoplay autoplaySpeed={3000}>
              {slides.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex flex-col justify-center bg-gradient-to-br from-sky-500 to-sky-800 text-white h-[300px] text-center gap-6">
                      <p
                        className="text-5xl font-bold uppercase"
                        // style={{ lineHeight: "200px" }}
                      >
                        {item.title}
                      </p>
                      <p className="text-2xl font-medium uppercase">
                        <i>{item.text}</i>
                      </p>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </section>
          <div className="flex items-center flex-1 justify-center gap-2 my-10">
            {auth?.user ? (
              <Button type="primary">
                <Link to={"/dashboard"}>Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button type="link" style={{ padding: 0 }}>
                  <Link to="/login">Sign in</Link>
                </Button>
                <span>or</span>
                <Button type="primary">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
