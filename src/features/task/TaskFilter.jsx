import { Button, DatePicker, Radio, Select, Space, Switch } from "antd";
import React, { useEffect, useState } from "react";

import CardFilterPriority from "./CardFilterPriority";
import CardFilterList from "./CardFilterList";
import CardFilterDueDate from "./CardFilterDueDate";
const { RangePicker } = DatePicker;

export default function TaskFilter({ setFilters, inLists, setInLists }) {
  const [value, setValue] = useState(1);
  const [expand, setExpand] = useState(false);

  const [showCompleted, setShowCompleted] = useState(true);
  const [priority, setPriority] = useState([]);

  useEffect(() => {
    setFilters(() => {
      if (value === 2) return [];
      let newfilters = showCompleted
        ? [...priority]
        : ["completed", ...priority];
      newfilters =
        inLists.length === 0 ? newfilters : [...newfilters, "inLists"];
      return newfilters;
    });
  }, [value, priority, showCompleted, inLists]);

  return (
    <div className="w-full p-2">
      <div className="flex items-center gap-4">
        <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
          <Radio value={1}>Filter</Radio>
          <Radio value={2}>Disable</Radio>
        </Radio.Group>
        <Button>Reset</Button>
      </div>
      <div
        className={
          (value === 1 ? "" : "-translate-y-4 opacity-0 invisible h-0") +
          " duration-200 py-4 flex gap-2"
        }
      >
        <div className="flex flex-wrap items-start gap-6">
          <div>
            {/* <h3>Show completed</h3> */}
            <div className="flex items-center gap-2">
              <Switch
                // loading={false}
                // defaultChecked
                checked={showCompleted}
                onChange={(checked) => setShowCompleted(checked)}
                id="filter_completed"
                label="Completed"
              />
              <label htmlFor="filter_completed">Completed</label>
            </div>
          </div>
          <CardFilterPriority setPriority={setPriority} />
          <CardFilterList setInLists={setInLists} />
          <CardFilterDueDate />
        </div>
      </div>
    </div>
  );
}
