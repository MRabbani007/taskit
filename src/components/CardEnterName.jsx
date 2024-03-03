import React, { useContext, useState } from "react";
import { CiEdit, CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { UserContext } from "../context/UserState";

const CardEnterName = () => {
  const { name, handleEditName } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState(name.split(" ")[0] || "");
  const [lastName, setLastName] = useState(name.split(" ")[1] || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName === "" && lastName === "") {
      alert("No values entered");
    } else {
      handleEditName(firstName + " " + lastName);
      setEdit(false);
    }
  };

  return (
    <div>
      <span className="mr-2">Name:</span>
      {edit ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-3 items-center"
        >
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
        </form>
      ) : (
        <>
          {name === "" ? (
            <button className="btn btn-red" onClick={() => setEdit(true)}>
              Enter Name
            </button>
          ) : (
            <>
              <span className="group">
                {name}
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

export default CardEnterName;
