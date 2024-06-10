import { Button, DatePicker, Radio, Select, Space, Switch } from "antd";
import React, { useEffect, useState } from "react";

import CardFilterPriority from "./CardFilterPriority";
import CardFilterList from "./CardFilterList";
import CardFilterDueDate from "./CardFilterDueDate";
const { RangePicker } = DatePicker;

export default function TaskFilter({
  setFilters,
  inLists,
  setInLists,
  viewFilter,
}) {
  const [expand, setExpand] = useState(false);

  const [showCompleted, setShowCompleted] = useState(true);
  const [priority, setPriority] = useState([]);

  useEffect(() => {
    setFilters(() => {
      if (!viewFilter) return [];
      let newfilters = showCompleted
        ? [...priority]
        : ["completed", ...priority];
      newfilters =
        inLists.length === 0 ? newfilters : [...newfilters, "inLists"];
      return newfilters;
    });
  }, [viewFilter, priority, showCompleted, inLists]);

  return (
    <div className="mx-auto p-2">
      <div
        className={
          (viewFilter === true
            ? ""
            : "-translate-y-4 opacity-0 invisible h-0") +
          " duration-200 py-4 flex gap-2"
        }
      >
        <div className="flex flex-wrap items-start gap-6">
          <div>
            {/* <h3>Show completed</h3> */}
            <div className="flex items-center gap-2">
              <Switch
                size="small"
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
