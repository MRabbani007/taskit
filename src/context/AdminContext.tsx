import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ReactNode, createContext, useEffect, useState } from "react";

type AdminState = {
  users: User[];
  getAdminUsers: () => void;
  updateAdminUser: (user: User) => void;
};

const InitialState: AdminState = {
  users: [],
  getAdminUsers: () => {},
  updateAdminUser: () => {},
};

export const AdminContext = createContext(InitialState);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState<User[]>([]);

  async function getAdminUsers() {
    try {
      const response = await axiosPrivate.get("/user/admin");

      if (Array.isArray(response?.data)) {
        setUsers(response?.data as User[]);
      }

      console.log(response);

      return response;
    } catch (error) {}
  }

  async function updateAdminUser(userData: User) {
    try {
      let response = await axiosPrivate({
        url: "/user/settings",
        method: "PATCH",
        data: {
          userData,
        },
      });

      return response;
    } catch (error) {}
  }

  useEffect(() => {
    const controller = new AbortController();

    getAdminUsers();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <AdminContext.Provider value={{ users, getAdminUsers, updateAdminUser }}>
      {children}
    </AdminContext.Provider>
  );
};
