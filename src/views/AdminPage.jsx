import { useEffect, useState } from "react";
// Imported Hooks
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
// Imported Data
import { SERVER } from "../data/actions";

const AdminPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchUsers = async () => {
      return await axiosPrivate.post(SERVER.GET_USER, { roles: auth?.roles });
    };

    fetchUsers()
      .then((res) => {
        isMounted && setUsers(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="">
      <h1>AdminPage</h1>
      <br />
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Name</th>
            <th>roles</th>
            <th>Date Created</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {users.length !== 0 &&
            users.map((user, index) => {
              return (
                <tr key={index} className="">
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user?.name}</td>
                  <td>{JSON.stringify(Object.values(user?.roles))}</td>
                  <td>{user?.createDate}</td>
                  <td>{user?.active}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
