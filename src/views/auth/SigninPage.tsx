// Imported Components
import { Button, Checkbox, Form, Input } from "antd";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import useToggle from "../../hooks/useToggle";
import axios from "../../api/axios";

export default function SigninPage() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  // Set focus to username input on load
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  // const [user, resetUser, userAttribs] = useInput("user", "");
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  const [success, setSuccess] = useState(false);
  const canSubmit = userName !== "" && pwd !== "";

  useEffect(() => {
    if (!success) {
      userRef?.current?.focus();
    }
  }, []);

  useEffect(() => {
    // Remove error message on user input
    setErrMsg("");
  }, [userName, pwd]);

  const handleSubmit = async () => {
    try {
      let response = await axios({
        method: "POST",
        url: "/user/auth",
        data: {
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
        setErrMsg("Sign in Failed");
      }
    } catch (error) {
      // console.log(error);
      // if (!error?.response) {
      //   setErrMsg("No Server Response");
      // } else if (error.response?.status === 400) {
      //   setErrMsg("Missing Username or Password");
      // } else if (error.response?.status === 401) {
      //   setErrMsg("Wrong username or password");
      // } else {
      //   setErrMsg("Login Failed");
      // }
      errRef?.current?.focus();
    }
  };

  return (
    <main className="justify-center items-center">
      <Form
        onFinish={handleSubmit}
        name="normal_login"
        className="login-form mx-auto border-2 p-8 rounded-xl shadow-md shadow-blue-500"
        initialValues={{
          remember: true,
        }}
        layout="vertical"
      >
        <h1 className="text-center text-blue-500 font-thin mb-4">Sign In</h1>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please enter username",
            },
          ]}
        >
          <Input
            id="username"
            name="username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            autoComplete="off"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please enter password",
            },
          ]}
          className="p-0 m-0"
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
          <Link className="login-form-forgot" to="/forgotpassword">
            Forgot password
          </Link>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!canSubmit}
            className="login-form-button mr-2"
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox id="persist" onChange={toggleCheck} checked={check}>
            Remember me
          </Checkbox>
        </Form.Item>
      </Form>
    </main>
  );
}
