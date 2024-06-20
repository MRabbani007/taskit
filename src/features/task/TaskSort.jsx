import { Button } from "antd";
import React from "react";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

export default function TaskSort({ setSort }) {
  return (
    <div className="w-full sm:px-8">
      <div className="flex flex-wrap gap-6 justify-center">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setSort("priority_a")}
            icon={<IoIosArrowRoundDown size={28} />}
          ></Button>
          <Button
            onClick={() => setSort("priority_d")}
            icon={<IoIosArrowRoundUp size={28} />}
          ></Button>
          <span>Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setSort("title_a")}
            icon={<IoIosArrowRoundDown size={28} />}
          ></Button>
          <Button
            onClick={() => setSort("title_d")}
            icon={<IoIosArrowRoundUp size={28} />}
          ></Button>
          <span>Title</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setSort("createDate_a")}
            icon={<IoIosArrowRoundDown size={28} />}
          ></Button>
          <Button
            onClick={() => setSort("createDate_d")}
            icon={<IoIosArrowRoundUp size={28} />}
          ></Button>
          <span>Create Date</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setSort("dueDate_d")}
            icon={<IoIosArrowRoundDown size={28} />}
          ></Button>
          <Button
            onClick={() => setSort("dueDate_a")}
            icon={<IoIosArrowRoundUp size={28} />}
          ></Button>
          <span>Due Date</span>
        </div>
      </div>
    </div>
  );
}
