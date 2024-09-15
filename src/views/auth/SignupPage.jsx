// React dependencies
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
// Imported Data
import { ACTIONS, SERVER } from "../../data/actions";
// Imported Icons
import { Button, Checkbox, Form, Input, Space, notification } from "antd";
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

  const handleSubmit = async (values) => {
    // e.preventDefault();
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
        if (response?.status === 201) {
          setSuccess(true);
          //clear state and controlled inputs
          //need value attrib on inputs for this
          setUserName("");
          setPwd("");
          setMatchPwd("");
          navigate(from, { replace: true });
          navigate("/login", { state: { username: userName } });
          alert("Success");
          notification("Success, user registered");
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
        <h1 className="text-center text-blue-500 font-thin mb-2">Sign up</h1>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        {/* <label htmlFor="username" className="flex items-center">
        <CiSquareCheck size={25} className={validName ? "valid" : "hide"} />
        <CiSquareRemove
          size={25}
          className={validName || !userName ? "hide" : "invalid"}
        />
      </label> */}
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter username!",
            },
            {
              min: 4,
              message: "Must be at least 4 characters",
            },
            {
              max: 24,
              message: "Maximum of 24 characters allowed",
            },
            {
              pattern: new RegExp(/^[A-z][A-z0-9-_]{3,23}$/),
              message:
                "Must being with a letter. Letters, numbers, hyphen and underscore are allowed",
            },
          ]}
          label={"Username"}
          validateStatus={
            validName === true ? "success" : userName === "" ? "" : "warning"
          }
          // help={
          //   <pre>
          //     4 to 24 characters
          //     <br />
          //     Must begin with a letter
          //     <br />
          //     Letters, numbers, underscores, hyphens allowed
          //   </pre>
          // }
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
        {/* <p
        id="uidnote"
        className={
          userFocus && userName && !validName
            ? "instructions max-w-[200px]"
            : "offscreen"
        }
      >
        <CiSquareInfo className="icon" />
        4 to 24 characters.
        <br />
        Must begin with a letter.
        <br />
        Letters, numbers, underscores, hyphens allowed.
      </p> */}
        {/* <label htmlFor="password" className="my-2 flex items-center">
        <CiSquareCheck size={25} className={validPwd ? "valid" : "hide"} />
        <CiSquareRemove
          size={25}
          className={validPwd || !pwd ? "hide" : "invalid"}
        />
      </label> */}
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please provide password!",
            },
            { min: 8, message: "Must be at least 8 characters" },
            { max: 24, message: "Maximum of 24 characters allowed" },
            {
              pattern: new RegExp(PWD_REGEX),
              message:
                "Must include uppercase and lowercase letters, a number and a special character (@, #, $, %).",
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
        {/* <p
        id="pwdnote"
        className={
          pwdFocus && !validPwd ? "instructions max-w-[200px] z-2" : "offscreen"
        }
      >
        <CiSquareInfo className="icon" />
        8 to 24 characters.
        <br />
        Must include uppercase and lowercase letters, a number and a special
        character.
        <br />
        Allowed special characters: <span aria-label="exclamation mark">
          !
        </span>{" "}
        <span aria-label="at symbol">@</span>{" "}
        <span aria-label="hashtag">#</span>{" "}
        <span aria-label="dollar sign">$</span>{" "}
        <span aria-label="percent">%</span>
      </p> */}
        {/* <label htmlFor="confirm_pwd" className="flex items-center">
        <CiSquareCheck
          size={25}
          className={validMatch && matchPwd ? "valid" : "hide"}
        />
        <CiSquareRemove
          size={25}
          className={validMatch || !matchPwd ? "hide" : "invalid"}
        />
      </label> */}
        <Form.Item
          name="confirm_password"
          label={"Confirm Password"}
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
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
        {/* <p
        id="confirmnote"
        className={matchFocus && !validMatch ? "instructions" : "offscreen"}
      >
        <CiCircleInfo className="icon" />
        Must match the first password input field.
      </p> */}
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Register
            </Button>
            <span>or</span>
            <Link to="/login" className="login-form-button ml-2">
              Sign In
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </main>
  );
};

export default Signup;
