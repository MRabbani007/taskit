import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Imported Context
// Imported Hooks
import useAuth from "../../hooks/useAuth";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
// Imported Data
import { ACTIONS, SERVER } from "../../data/actions";
// Imported Icons
import { FaRegUserCircle } from "react-icons/fa";
import axios from "../../api/axios";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const SignIn = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Set focus to username input on load
  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttribs] = useInput("user", "");
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
  }, [user, pwd]);

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
        setAuth({ user, roles, accessToken });
        resetUser();
        setPwd("");
        setSuccess(true);
        navigate(from, { replace: true });
        navigate("/", { state: { username: user } });
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
    <Form
      onFinish={handleSubmit}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <h1 className="text-center">Sign In</h1>
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
        <Button type="primary" htmlType="submit" className="login-form-button">
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
  );
};

export default SignIn;
