import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { BsCardList } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import CardListName from "../../features/taskList/CardListName";
import { Link } from "react-router-dom";
import { Button, Flex, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UserListsPage = () => {
  const { listNames } = useContext(GlobalContext);
  const [expand, setExpand] = useState(true);

  return (
    // container
    <div className="flex-1 min-w-fit w-full pb-20">
      <h2
        className="bg-gradient-to-r from-zinc-600 to-zinc-400 p-3 text-white rounded-xl text-center cursor-pointer relative flex items-center justify-between gap-3 shadow-md shadow-zinc-500"
        onClick={() => setExpand((prev) => !prev)}
      >
        <span className="flex items-center gap-3">
          <BsCardList className="icon" />
          <span>My Lists</span>
        </span>
        <SlArrowRight
          size={25}
          className={(expand ? "rotate-90 " : "") + "duration-300"}
        />
      </h2>
      <ul
        className={
          (expand
            ? "translate-y-[0] opacity-100 "
            : "translate-y-[-20px] opacity-0 ") +
          " p-3 duration-300 flex flex-col flex-wrap gap-2"
        }
      >
        {Array.isArray(listNames) &&
          listNames.map((list, index) => {
            if (list?.trash === undefined || list?.trash === false) {
              return <CardListName key={index} taskList={list} />;
            }
          })}
      </ul>
      {listNames?.length === 0 && "No Lists"}
      <FloatButton
        type="primary"
        tooltip="Create New List"
        icon={<PlusOutlined />}
        href="createList"
        style={{ right: 94 }}
      ></FloatButton>
    </div>
  );
};

export default UserListsPage;
