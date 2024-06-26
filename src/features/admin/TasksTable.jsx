import React, { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskState";

const TasksTable = ({ task, idx }) => {
  const [edit, setEdit] = useState(false);
  const { handleDeleteTask } = useContext(TaskContext);

  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{task?.id}</td>
      {/* <td>{task.userID}</td> */}
      <td>{task?.listID}</td>
      <td>{task?.title}</td>
      <td>{task?.priority}</td>
      <td>{task?.detail}</td>
      <td>{task?.dueDate}</td>
      <td
        onClick={() => {
          handleDeleteTask(task.id);
        }}
      >
        Delete
      </td>
    </tr>
  );
};

export default TasksTable;
