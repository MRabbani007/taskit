import { Switch } from "antd";
import React, { useEffect, useState } from "react";

export default function CardFilterPriority({ priority, setPriority }) {
  const [pLow, setPLow] = useState(true);
  const [pNormal, setPNormal] = useState(true);
  const [pHigh, setPHigh] = useState(true);

  useEffect(() => {
    setPriority(() => {
      const priorityFilter = pLow ? [] : ["priority_low"];
      pNormal ? null : priorityFilter.push("priority_normal");
      pHigh ? null : priorityFilter.push("priority_high");
      return priorityFilter;
    });
  }, [pLow, pNormal, pHigh]);

  return (
    <form className="flex flex-col gap-2">
      {/* <h3>Priority</h3> */}
      <div className="flex items-center gap-2">
        <Switch
          checked={pLow}
          onChange={(e) => setPLow(e)}
          id="priority_low"
          size="small"
        />
        <label htmlFor="priority_low">Low</label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={pNormal}
          onChange={(e) => setPNormal(e)}
          id="priority_normal"
          size="small"
        />
        <label htmlFor="priority_normal">Normal</label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={pHigh}
          onChange={(e) => setPHigh(e)}
          id="priority_high"
          size="small"
        />
        <label htmlFor="priority_high">High</label>
      </div>
    </form>
  );
}
