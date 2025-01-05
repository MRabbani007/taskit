import React, { useState } from "react";
import { DatePicker, Radio, Select, Space, Switch } from "antd";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";

export default function CardFilterDueDate() {
  const [value, setValue] = useState(1);

  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onDateChange = (date) => {
    if (date) {
      console.log("Date: ", date);
    } else {
      console.log("Clear");
    }
  };
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  return (
    <div className="flex flex-col">
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>From</Radio>
        <Radio value={2}>To</Radio>
        <Radio value={3}>Range</Radio>
      </Radio.Group>
      {value === 1 || value === 2 ? (
        <DatePicker
          presets={[
            {
              label: "Yesterday",
              value: dayjs().add(-1, "d"),
            },
            {
              label: "Last Week",
              value: dayjs().add(-7, "d"),
            },
            {
              label: "Last Month",
              value: dayjs().add(-1, "month"),
            },
          ]}
          onChange={onDateChange}
        />
      ) : value === 3 ? (
        <RangePicker
          presets={[
            {
              label: (
                <span aria-label="Current Time to End of Day">Now ~ EOD</span>
              ),
              value: () => [dayjs(), dayjs().endOf("day")], // 5.8.0+ support function
            },
            ...rangePresets,
          ]}
          showTime
          format="YYYY/MM/DD HH:mm:ss"
          onChange={onRangeChange}
        />
      ) : null}
    </div>
  );
}
