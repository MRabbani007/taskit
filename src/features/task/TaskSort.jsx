import { Button } from "antd";
import React from "react";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

export default function TaskSort() {
  return (
    <div className="w-full">
      <h2>Sort</h2>
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Button icon={<IoIosArrowRoundUp size={28} />}></Button>
          <Button icon={<IoIosArrowRoundDown size={28} />}></Button>
          <span>Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <Button icon={<IoIosArrowRoundUp size={28} />}></Button>
          <Button icon={<IoIosArrowRoundDown size={28} />}></Button>
          <span>Title</span>
        </div>
        <div className="flex items-center gap-2">
          <Button icon={<IoIosArrowRoundUp size={28} />}></Button>
          <Button icon={<IoIosArrowRoundDown size={28} />}></Button>
          <span>Create Date</span>
        </div>
        <div className="flex items-center gap-2">
          <Button icon={<IoIosArrowRoundUp size={28} />}></Button>
          <Button icon={<IoIosArrowRoundDown size={28} />}></Button>
          <span>Due Date</span>
        </div>
      </div>
    </div>
  );
}
