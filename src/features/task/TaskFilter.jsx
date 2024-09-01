import { Button, DatePicker, Modal, Radio, Select, Space, Switch } from "antd";
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
  setViewFilter,
}) {
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
    <Modal
      open={viewFilter}
      title="Filter Tasks"
      okText="Apply"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={() => setViewFilter(false)}
      onOk={() => setViewFilter(false)}
      destroyOnClose={true}
      modalRender={(dom) => <>{dom}</>}
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
    </Modal>
  );
}
