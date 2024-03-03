import React, { useContext, useRef, useState } from "react";
import { CiEdit, CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { UserContext } from "../context/UserState";

const CardEnterEmail = () => {
  const { email, handleEditEmail } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [newEmail, setNewEmail] = useState(email || "");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEmail === "") {
      alert("No input");
    } else {
      let v1 = EMAIL_REGEX.test(newEmail);
      console.log(v1);
      if (!v1) {
        setErrMsg("Invalid Email");
        errRef.current.focus();
      } else {
        setErrMsg("");
        handleEditEmail(newEmail);
        setEdit(false);
      }
    }
  };

  return (
    <div>
      <span className="mr-2">Email:</span>
      {edit ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-3 items-center"
        >
          <input
            type="text"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => {
              setErrMsg("");
              setNewEmail(e.target.value);
            }}
          />
          <span className="min-w-fit">
            <button>
              <CiSquareCheck className="icon" />
            </button>
            <CiSquareRemove
              className="icon"
              onClick={() => {
                setEdit(false);
              }}
            />
          </span>
          <p
            ref={errRef}
            className={errMsg !== "" ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
        </form>
      ) : (
        <>
          {email === "" ? (
            <button className="btn btn-red" onClick={() => setEdit(true)}>
              Enter Email
            </button>
          ) : (
            <>
              <span className="group">
                {email}
                <CiEdit
                  className="icon ml-2 invisible group-hover:visible"
                  onClick={() => setEdit(true)}
                />
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CardEnterEmail;
