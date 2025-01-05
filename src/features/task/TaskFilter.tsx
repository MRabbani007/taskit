import { Radio, RadioChangeEvent, Select, Space, Switch } from "antd";
import CardFilterDueDate from "./CardFilterDueDate";
import { FormEvent, useContext, useState } from "react";
import { TaskContext } from "../../context/TaskState";
import FormContainer from "../components/FormContainer";
import { ListContext } from "@/context/ListState";

export default function TaskFilter() {
  const { filters, setFilters } = useContext(TaskContext);
  const { lists } = useContext(ListContext);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setFilters((curr) => ({ ...curr, viewFilter: false }));
  };

  const listOptions = lists.map((item) => {
    return { label: item.title, value: item.id, desc: item.title };
  });

  const options = listOptions;

  const [value, setValue] = useState(1);
  const onChange = (event: RadioChangeEvent) => {
    setValue(event.target.value);
  };

  const handleChange = (value: string[]) => {
    setFilters((curr) => ({ ...curr, inLists: value }));
  };

  return (
    <FormContainer
      title="Filter Tasks"
      onSubmit={onSubmit}
      showForm={filters?.viewFilter ?? false}
      setShowForm={() => setFilters((curr) => ({ ...curr, viewFilter: false }))}
    >
      <div>
        <p className="text-sm font-semibold">Show Completed</p>
        <div className="flex items-center gap-2">
          <Switch
            size="small"
            checked={filters?.showCompleted ?? true}
            onChange={() =>
              setFilters((curr) => ({
                ...curr,
                showCompleted: !curr.showCompleted,
              }))
            }
            id="filter_completed"
          />
          <label htmlFor="filter_completed">Completed</label>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold">Task Priority</p>
        <div className="flex flex-wrap items-start gap-6">
          <div>
            <Switch
              checked={filters?.showPLow ?? true}
              onChange={() =>
                setFilters((curr) => ({ ...curr, viewFilter: false }))
              }
              id="showPLow"
              size="small"
            />
            <label htmlFor="showPLow">Low</label>
          </div>
          <div>
            <Switch
              checked={filters?.showPNormal ?? true}
              onChange={() =>
                setFilters((curr) => ({ ...curr, viewFilter: false }))
              }
              id="showPNormal"
              size="small"
            />
            <label htmlFor="showPNormal">Normal</label>
          </div>
          <div>
            <Switch
              checked={filters?.showPHigh}
              onChange={() =>
                setFilters((curr) => ({ ...curr, viewFilter: false }))
              }
              id="showPHigh"
              size="small"
            />
            <label htmlFor="showPHigh">High</label>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold">Filter by List:</p>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>All</Radio>
          <Radio value={2}>Selected</Radio>
        </Radio.Group>
        <Select
          mode="multiple"
          style={{
            width: "100%",
            minWidth: "200px",
          }}
          placeholder="select lists"
          defaultValue={[]}
          onChange={handleChange}
          options={options}
          optionRender={(option) => (
            <Space>
              <span role="img" aria-label={option.data.label}>
                {option.data.emoji}
              </span>
              {option.data.desc}
            </Space>
          )}
        />
      </div>
      <div>
        <p className="text-sm font-semibold">Filter by Date:</p>
        <CardFilterDueDate />
      </div>
    </FormContainer>
  );
}
