import React, { createContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { ACTIONS, SERVER } from "../data/actions";

// Initial state
const initialState = {
  userName: "",
  name: "",
  email: "",
};

// Create context
export const UserContext = createContext(initialState);

// Provider component
export const UserProvider = ({ children }) => {
  // Store userName
  const [user, setUser] = useState(initialState);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const handleEditName = async (name) => {
    try {
      let response = await axiosPrivate.put(SERVER.USER_EDIT_SETTINGS, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.USER_EDIT_NAME,
          payload: { username: auth?.user, name },
        },
      });
      if (response.data.status === "success") {
        setUser((prev) => {
          return { ...prev, name };
        });
      }
    } catch (error) {}
  };

  const handleEditEmail = async (email) => {
    try {
      let response = await axiosPrivate.put(SERVER.USER_EDIT_SETTINGS, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.USER_EDIT_EMAIL,
          payload: { username: auth?.user, email },
        },
      });
      if (response.data.status === "success") {
        setUser((prev) => {
          return { ...prev, email };
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosPrivate.post(SERVER.GET_USER_SETTINGS, {
        username: auth?.user,
        roles: auth?.roles,
      });
      const data = response?.data;
      setUser((prev) => {
        let name = "user";
        let email = "";
        if (response?.data?.name !== "") {
          name = data.name;
        }
        if (response?.data?.email !== "") {
          email = data.email;
        }
        return { ...prev, name, email };
      });
    };
    if (auth?.user && auth?.roles) {
      fetchUser();
    }
  }, [auth?.user]);

  return (
    <UserContext.Provider
      value={{
        name: user?.name || "",
        email: user?.email || "",
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
