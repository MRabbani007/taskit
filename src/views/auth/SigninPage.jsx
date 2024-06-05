// Imported Components
import { Button, Checkbox, Form, Input } from "antd";
import SignIn from "../../features/auth/SignIn";
import SignOut from "../../features/auth/SignOut";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import useToggle from "../../hooks/useToggle";
import axios from "../../api/axios";
import { ACTIONS, SERVER } from "../../data/actions";

const SigninPage = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Set focus to username input on load
  const userRef = useRef();
  const errRef = useRef();

  // const [user, resetUser, userAttribs] = useInput("user", "");
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!success) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Remove error message on user input
    setErrMsg("");
  }, [userName, pwd]);

  const handleSubmit = async () => {
    try {
      let response = await axios.post(SERVER.USER_SIGNIN, {
        type: ACTIONS.USER_SIGNIN,
        payload: {
          username: userName,
          password: pwd,
        },
      });

      if (response?.data?.status === "success") {
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ user: userName, roles, accessToken });
        // resetUser();
        setUserName("");
        setPwd("");
        setSuccess(true);
        navigate(from, { replace: true, state: { username: userName } });
        // navigate("/dashboard", { state: { username: userName } });
      } else {
        alert(response);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      console.log(err);
      errRef.current.focus();
    }
  };

  return (
    <main className="">
      <Form
        onFinish={handleSubmit}
        name="normal_login"
        className="login-form border-2 p-8 rounded-xl shadow-md shadow-blue-500"
        initialValues={{
          remember: true,
        }}
      >
        <h1 className="text-center text-blue-500 font-thin mb-4">Sign In</h1>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <label htmlFor="username" className="my-2">
          Username
        </label>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            id="username"
            name="username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            autoComplete="off"
            ref={userRef}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>
        <label htmlFor="password" className="my-2">
          Password
        </label>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input password!",
            },
          ]}
        >
          <Input
            id="password"
            name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button mr-2"
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox id="persist" onChange={toggleCheck} checked={check}>
              Remember me
            </Checkbox>
          </Form.Item>
          <Link className="login-form-forgot" to="/forgotpassword">
            Forgot password
          </Link>
        </Form.Item>
      </Form>
    </main>
  );
};

export default SigninPage;
