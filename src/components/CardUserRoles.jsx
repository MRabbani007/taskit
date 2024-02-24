import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const CardUserRoles = () => {
  const { auth } = useAuth();
  const [roles, setRoles] = useState(() => {
    if (auth?.roles) {
      let temp = auth.roles.map((role) => {
        if (role === 2001) {
          return "User";
        } else if (role === 5150) {
          return "Admin";
        }
      });
      return temp;
    }
    return [];
  }, []);

  return (
    <div>
      <span>
        Roles:{" "}
        {roles.map((item, index) => {
          return (
            <span key={index} className="mr-1">
              {item}
            </span>
          );
        })}
      </span>
    </div>
  );
};

export default CardUserRoles;
