import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TasksTable from "../../features/admin/TasksTable";
import { ACTIONS, SERVER } from "../../data/actions";
import useAuth from "../../hooks/useAuth";

const AdminTasks = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expand, setExpand] = useState(false);

  const tasksGetAll = async () => {
    try {
      setLoading(true);
      let response = await axiosPrivate.post(SERVER.GET_TASKS_ALL, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.UPDATE_TASK,
          payload: {
            userName: auth?.user,
          },
        },
      });
      if (Array.isArray(response?.data)) {
        setTasks(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    tasksGetAll();
  }, []);

  return (
    <div>
      <h1
        onClick={() => {
          setExpand(!expand);
        }}
      >
        AdminTasks
      </h1>
      <table className={expand ? "visible" : "invisible h-0"}>
        <thead>
          <tr>
            <th>SN</th>
            <th>Task ID</th>
            <th>List ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Detail</th>
            <th>Due Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            tasks.map((task, index) => {
              return <TasksTable key={index} task={task} idx={index} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTasks;
