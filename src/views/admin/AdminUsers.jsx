import { useEffect, useState } from "react";
// Imported Hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
// Imported Data
import { ACTIONS, SERVER } from "../../data/actions";
import { FiUsers } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { format } from "date-fns";

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
      return await axiosPrivate.get("/user/admin");
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
      <div className="flex flex-col gap-2">
        {users.length !== 0 &&
          users.map((user, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <FaRegCircleUser size={40} />
                <div>
                  <p className="text-xl font-semibold">{user?.username}</p>
                  <p>
                    <span>{user?.name}</span>
                    <span>{user?.firstname}</span>
                    <span>{user?.lastname}</span>
                  </p>
                  <p>{user?.email}</p>
                </div>
                <p>
                  {format(user?.createDate.substring(0, 10), "EEEE dd MMM")}
                </p>
              </div>
            );
          })}
      </div>
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
