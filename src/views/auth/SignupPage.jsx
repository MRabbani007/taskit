// React dependencies
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
// Imported Data
import { ACTIONS, SERVER } from "../../data/actions";
// Imported Icons
import { FaRegUserCircle } from "react-icons/fa";
import {
  CiCircleInfo,
  CiSquareCheck,
  CiSquareInfo,
  CiSquareRemove,
} from "react-icons/ci";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(userName));
  }, [userName]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [userName, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(userName);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    } else {
      try {
        const response = await axios.post(SERVER.USER_SIGNUP, {
          type: ACTIONS.USER_SIGNUP,
          payload: {
            username: userName,
            password: pwd,
          },
        });
        if (response?.data?.status === "success") {
          setSuccess(true);
          //clear state and controlled inputs
          //need value attrib on inputs for this
          setUserName("");
          setPwd("");
          setMatchPwd("");
          navigate(from, { replace: true });
          navigate("login", { state: { username: userName } });
        } else {
          alert(response);
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 409) {
          setErrMsg("Username Taken");
        } else {
          setErrMsg("Registration Failed");
        }
        errRef.current.focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-slate-950">
      <Form
        onFinish={handleSubmit}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <h1 className="text-center">Sign up</h1>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <label htmlFor="username" className="my-2 flex items-center">
          Username
          <CiSquareCheck size={25} className={validName ? "valid" : "hide"} />
          <CiSquareRemove
            size={25}
            className={validName || !userName ? "hide" : "invalid"}
          />
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
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
        </Form.Item>
        <p
          id="uidnote"
          className={
            userFocus && userName && !validName ? "instructions" : "offscreen"
          }
        >
          <CiSquareInfo className="icon" />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
        <label htmlFor="password" className="my-2 flex items-center">
          Password
          <CiSquareCheck size={25} className={validPwd ? "valid" : "hide"} />
          <CiSquareRemove
            size={25}
            className={validPwd || !pwd ? "hide" : "invalid"}
          />
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
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
        </Form.Item>
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <CiSquareInfo className="icon" />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
        <label htmlFor="confirm_pwd" className="flex items-center">
          Confirm Password:
          <CiSquareCheck
            size={25}
            className={validMatch && matchPwd ? "valid" : "hide"}
          />
          <CiSquareRemove
            size={25}
            className={validMatch || !matchPwd ? "hide" : "invalid"}
          />
        </label>
        <Form.Item
          name="confirm_password"
          rules={[
            {
              required: true,
              message: "Please confirm password!",
            },
          ]}
        >
          <Input
            id="confirm_password"
            name="confirm_password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
        </Form.Item>
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <CiCircleInfo className="icon" />
          Must match the first password input field.
        </p>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={!validName || !validPwd || !validMatch ? true : false}
          >
            Register
          </Button>
        </Form.Item>
        <Form.Item>
          Already have an account?
          <Link to="/login" className="login-form-button">
            Sign In
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
