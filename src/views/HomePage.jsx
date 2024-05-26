import { useEffect } from "react";
// Imported Context
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
// import Logo from "logo.png";
// Imported Components

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
        <h1 className="m-0 p-0">Welcome!</h1>
        <p className="font-light text-lg text-blue-600">
          Your Daily Adventure Starts Here
        </p>
      </div>
      <div className="h-full shrink-0 ">
        <img
          src="logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="from-zinc-500/30 to-zinc-500/10 bg-gradient-to-br rounded-full p-3 mb-20"
        />
        <div className="flex h-full  items-center gap-2">
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
