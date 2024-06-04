import { Switch } from "antd";
import React, { useState } from "react";

export default function CardFilterPriority() {
  const [priority, setPriority] = useState([]);

  return (
    <form className="flex flex-col gap-2">
      <h3>Priority</h3>
      <div className="flex items-center gap-2">
        <Switch loading={false} defaultChecked id="priority_low" />
        <label htmlFor="priority_low">Low</label>
      </div>
      <div className="flex items-center gap-2">
        <Switch loading={false} defaultChecked id="priority_normal" />
        <label htmlFor="priority_normal">Normal</label>
      </div>
      <div className="flex items-center gap-2">
        <Switch loading={false} defaultChecked id="priority_high" />
        <label htmlFor="priority_high">High</label>
      </div>
    </form>
  );
}
