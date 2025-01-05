import { MoreOutlined } from "@ant-design/icons";
import { Flex, FloatButton } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  IoCalendarOutline,
  IoRepeatOutline,
  IoStarOutline,
  IoTodayOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

export default function RadioMenu() {
  const [firstMenu, setFirstMenu] = useState(false);
  const [secondMenu, setSecondMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setFirstMenu(!firstMenu);
    setSecondMenu(!secondMenu);
  };

  const closeMenu = (event: MouseEvent) => {
    if (firstMenu) {
      if (!menuRef?.current?.contains(event.target as Node | null)) {
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
        <Flex vertical={true} gap={"small"}>
          <Link to={"/tasks/today"} className="w-full h-full">
            <FloatButton tooltip="Tasks for today" icon={<IoTodayOutline />} />
          </Link>
          <Link to={"/tasks/week"}>
            <FloatButton
              tooltip="Tasks for this week"
              icon={<IoCalendarOutline />}
            />
          </Link>
          <Link to={"/tasks/important"}>
            <FloatButton tooltip="Important tasks" icon={<IoStarOutline />} />
          </Link>
          <Link to={"/tasks/overdue"}>
            <FloatButton tooltip="Overdue tasks" icon={<IoRepeatOutline />} />
          </Link>
        </Flex>
      </FloatButton.Group>
    </div>
  );
}
