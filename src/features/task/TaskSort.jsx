import { Button, Modal } from "antd";
import React, { useContext } from "react";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { TaskContext } from "../../context/TaskState";

export default function TaskSort() {
  const { filters, setFilters } = useContext(TaskContext);

  const [sort, setSort] = useState("");

  const handleSort = (val) => {
    setSort(val);
  };

  return (
    <Modal
      open={filters?.viewSort}
      title="Sort Tasks"
      okText="Apply"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={() => setFilters((curr) => ({ ...curr, viewSort: false }))}
      onOk={() => setFilters((curr) => ({ ...curr, viewSort: false }))}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={() =>
              setFilters((curr) => ({ ...curr, sort: "priority_a" }))
            }
            icon={<IoIosArrowRoundDown size={28} />}
          ></Button>
          <Button
            onClick={() =>
              setFilters((curr) => ({ ...curr, sort: "priority_d" }))
            }
            icon={<IoIosArrowRoundUp size={28} />}
          ></Button>
          <span>Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setFilters((curr) => ({ ...curr, sort: "title_a" }))}
            icon={<IoIosArrowRoundDown size={28} />}
          ></Button>
          <Button
            onClick={() => setFilters((curr) => ({ ...curr, sort: "title_d" }))}
            icon={<IoIosArrowRoundUp size={28} />}
          ></Button>
          <span>Title</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() =>
              setFilters((curr) => ({ ...curr, sort: "createDate_a" }))
            }
            icon={<IoIosArrowRoundDown size={28} />}
          ></Button>
          <Button
            onClick={() =>
              setFilters((curr) => ({ ...curr, sort: "createDate_d" }))
            }
            icon={<IoIosArrowRoundUp size={28} />}
          ></Button>
          <span>Create Date</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() =>
              setFilters((curr) => ({ ...curr, sort: "dueDate_d" }))
            }
            icon={<IoIosArrowRoundDown size={28} />}
          ></Button>
          <Button
            onClick={() =>
              setFilters((curr) => ({ ...curr, sort: "dueDate_a" }))
            }
            icon={<IoIosArrowRoundUp size={28} />}
          ></Button>
          <span>Due Date</span>
        </div>
      </div>
    </Modal>
  );
}
