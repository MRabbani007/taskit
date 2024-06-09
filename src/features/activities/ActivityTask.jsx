import { Button, Checkbox } from "antd";
import React, { useState } from "react";
import FormActivityTaskEdit from "./FormActivityTaskEdit";
import { CiEdit } from "react-icons/ci";

export default function ActivityTask({ task }) {
  const [completed, setCompleted] = useState(task?.completed);
  const handleCompleted = () => {};

  const [edit, setEdit] = useState(false);

  return (
    <>
      <div>
        <div className="flex items-center gap-2 py-2 px-4 bg-zinc-200 rounded-md">
          <p>
            <Checkbox
              checked={completed}
              // disabled={disabled}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </p>
          <p>{task?.title}</p>
          <Button type="outline" onClick={() => setEdit(true)}>
            <CiEdit size={28} />
          </Button>
        </div>
        <p>{task?.detail}</p>
        <p>{task?.dueDate}</p>
      </div>
      <FormActivityTaskEdit task={task} edit={edit} setEdit={setEdit} />
    </>
  );
}
