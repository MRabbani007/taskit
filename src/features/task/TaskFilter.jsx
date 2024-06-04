import { Button, DatePicker, Radio, Select, Space, Switch } from "antd";
import React, { useState } from "react";

import CardFilterPriority from "./CardFilterPriority";
import CardFilterList from "./CardFilterList";
import CardFilterDueDate from "./CardFilterDueDate";
const { RangePicker } = DatePicker;

export default function TaskFilter() {
  const [value, setValue] = useState(1);
  const [expand, setExpand] = useState(false);

  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
          <Radio value={1}>Filter</Radio>
          <Radio value={2}>Disable</Radio>
        </Radio.Group>
        <Button>Reset</Button>
      </div>
      {value === 1 ? (
        <>
          <h2>Filter</h2>
          <div className="flex flex-wrap items-start gap-6">
            <div>
              <h3>Show completed</h3>
              <div className="flex items-center gap-2">
                <Switch
                  loading={false}
                  defaultChecked
                  id="filter_completed"
                  label="Completed"
                />
                <label htmlFor="filter_completed">Completed</label>
              </div>
            </div>
            <CardFilterPriority />
            <CardFilterList />
            <CardFilterDueDate />
          </div>
        </>
      ) : null}
    </div>
  );
}
