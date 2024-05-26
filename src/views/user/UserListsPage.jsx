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
    <main>
      <header
        className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white shadow-md shadow-zinc-500"
        onClick={() => setExpand((prev) => !prev)}
      >
        <div>
          <BsCardList size={40} />
          <h1>My Lists</h1>
        </div>
        <SlArrowRight
          size={25}
          className={(expand ? "rotate-90 " : "") + "duration-300"}
        />
      </header>
      <div>
        <ul
          className={
            (expand
              ? "translate-y-[0] opacity-100 "
              : "translate-y-[-20px] opacity-0 ") +
            " duration-300 flex flex-1 w-full flex-col gap-2"
          }
        >
          {Array.isArray(listNames) &&
            listNames.map((list, index) => {
              if (list?.trash === undefined || list?.trash === false) {
                return <CardListName key={index} taskList={list} />;
              }
            })}
        </ul>
        {listNames?.length === 0 ? <p>No Lists</p> : null}
      </div>
      <Link to={"/createList"}>
        <FloatButton
          type="primary"
          tooltip="Create New List"
          icon={<PlusOutlined />}
          style={{ right: 94 }}
        />
      </Link>
    </main>
  );
};

export default UserListsPage;
