import { MoreOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  IoAdd,
  IoCalendarOutline,
  IoRepeatOutline,
  IoStarOutline,
  IoTodayOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const RadioMenu = () => {
  const [firstMenu, setFirstMenu] = useState(false);
  const [secondMenu, setSecondMenu] = useState(false);
  const expand = false;

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setFirstMenu(!firstMenu);
    setSecondMenu(!secondMenu);
  };

  const closeMenu = (e) => {
    if (firstMenu) {
      if (!menuRef?.current?.contains(e.target)) {
        toggleMenu();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => closeMenu(e));
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  return (
    <div ref={menuRef} className="radio-menu">
      <FloatButton.Group trigger="hover" type="primary" icon={<MoreOutlined />}>
        <FloatButton
          tooltip="Tasks for today"
          href="/tasks/today"
          icon={<IoTodayOutline />}
        />
        <FloatButton
          tooltip="Tasks for this week"
          href="/tasks/week"
          icon={<IoCalendarOutline />}
        />
        <FloatButton
          tooltip="Important tasks"
          href="/tasks/important"
          icon={<IoStarOutline />}
        />
        <FloatButton
          tooltip="Overdue tasks"
          href="/tasks/overdue"
          icon={<IoRepeatOutline />}
        />
      </FloatButton.Group>
    </div>
  );
};

export default RadioMenu;
