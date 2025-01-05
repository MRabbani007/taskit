import { Button } from "antd";
import { FormEvent, useContext, useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import { TaskContext } from "../../context/TaskState";
import FormContainer from "../components/FormContainer";

export default function TaskSort() {
  const { filters, setFilters } = useContext(TaskContext);

  const [sort, setSort] = useState<string>(filters?.sort ?? "");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setFilters((curr) => ({ ...curr, sort, viewSort: false }));
  };

  return (
    <FormContainer
      title="Sort Tasks"
      onSubmit={onSubmit}
      showForm={filters?.viewSort ?? false}
      setShowForm={() => setFilters((curr) => ({ ...curr, viewSort: false }))}
    >
      <div className="flex items-center gap-2">
        Priority
        <Button
          onClick={() =>
            setSort((curr) =>
              curr === "priority_d" ? "priority_a" : "priority_d"
            )
          }
          title="Priority"
          icon={
            <IoIosArrowRoundUp
              size={28}
              className={
                (sort === "priority_a"
                  ? "rotate-180"
                  : sort === "priority_d"
                  ? ""
                  : "rotate-90") + " duration-200"
              }
            />
          }
          className="flex items-center"
        ></Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Title</span>
        <Button
          onClick={() =>
            setSort((curr) => (curr === "title_d" ? "title_a" : "title_d"))
          }
          icon={
            <IoIosArrowRoundUp
              size={28}
              className={
                (sort === "title_a"
                  ? "rotate-180"
                  : sort === "title_d"
                  ? ""
                  : "rotate-90") + " duration-200"
              }
            />
          }
        ></Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Create Date</span>
        <Button
          onClick={() =>
            setSort((curr) =>
              curr === "createDate_d" ? "createDate_a" : "createDate_d"
            )
          }
          icon={
            <IoIosArrowRoundUp
              size={28}
              className={
                (sort === "createDate_a"
                  ? "rotate-180"
                  : sort === "createDate_d"
                  ? ""
                  : "rotate-90") + " duration-200"
              }
            />
          }
        ></Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Due Date</span>
        <Button
          onClick={() =>
            setSort((curr) =>
              curr === "dueDate_d" ? "dueDate_a" : "dueDate_d"
            )
          }
          icon={
            <IoIosArrowRoundUp
              size={28}
              className={
                (sort === "dueDate_a"
                  ? "rotate-180"
                  : sort === "dueDate_d"
                  ? ""
                  : "rotate-90") + " duration-200"
              }
            />
          }
        ></Button>
      </div>
    </FormContainer>
  );
}
