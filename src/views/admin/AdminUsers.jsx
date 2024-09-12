import { useEffect, useState } from "react";
// Imported Hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
// Imported Data
import { ACTIONS, SERVER } from "../../data/actions";
import { FiUsers } from "react-icons/fi";

const AdminUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);

  const [editRoles, setEditRoles] = useState(null);

  const [roleUser, setRoleUser] = useState(false);
  const [roleAdmin, setRoleAdmin] = useState(false);

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

  const handleSetEdit = (index) => {
    if (Array.isArray(users)) {
      if (index === null) {
        setRoleUser(false);
        setRoleAdmin(false);
        setEditRoles(null);
        return;
      }
      setEditRoles(index);
      const temp = Object.values(users[index].roles);
      if (users[index]?.roles) {
        if (temp.includes(2001)) {
          setRoleUser(true);
        } else {
          setRoleUser(false);
        }
        if (temp.includes(5150)) {
          setRoleAdmin(true);
        } else {
          setRoleAdmin(false);
        }
      }
    }
  };

  const handleRolesSubmit = async (e) => {
    try {
      e.preventDefault();
      let roles = {};
      if (roleUser) {
        if (roleAdmin) {
          roles = { User: 2001, Admin: 5150 };
        } else {
          roles = { User: 2001 };
        }
      } else if (roleAdmin) {
        roles = { Admin: 5150 };
        alert("Warning, user role is required");
      } else {
        alert("Warning, user role is required");
      }

      let response = await axiosPrivate.put(SERVER.USER_EDIT_SETTINGS, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.USER_EDIT_ROLES,
          payload: { editUser: users[editRoles].username, roles: roles },
        },
      });

      if (response.data.status === "success") {
        alert("Roles Updated");
      } else {
        alert("Error");
      }
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <main>
      <header>
        <FiUsers size={40} />
        <h1 className="font-semibold">Users</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th>UserID</th>
            <th>Username</th>
            <th>roles</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {users.length !== 0 &&
            users.map((user, index) => {
              return (
                <tr key={index} className="">
                  <td>{user?.id}</td>
                  <td>{user?.username}</td>
                  <td
                    onClick={() => {
                      handleSetEdit(index);
                    }}
                  >
                    {JSON.stringify(Object.values(user?.roles))}
                  </td>
                  <td>{user?.active}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        {editRoles !== null && (
          <form onSubmit={handleRolesSubmit}>
            <span>{"User: " + users[editRoles].username}</span>
            <p>Roles</p>
            <input
              type="checkbox"
              id="role_user"
              checked={roleUser}
              onChange={(e) => setRoleUser(e.target.checked)}
            />
            <label htmlFor="role_user">User</label>
            <input
              type="checkbox"
              id="role_admin"
              checked={roleAdmin}
              onChange={(e) => setRoleAdmin(e.target.checked)}
            />
            <label htmlFor="role_admin">Admin</label>
            <div>
              <button type="submit" className="btn btn-red">
                Save
              </button>
              <span
                className="btn btn-blue"
                onClick={() => handleSetEdit(null)}
              >
                Cancel
              </span>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default AdminUsers;
