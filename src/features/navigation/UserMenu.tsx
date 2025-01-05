import {
  LoginOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";

export default function UserMenu() {
  const { auth } = useAuth();
  const [show, setShow] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const itemsGuest = [
    {
      label: "Sign In",
      url: "/login",
      icon: <LoginOutlined size={25} />,
    },
    {
      label: "Register",
      url: "/register",
      icon: <UserAddOutlined size={25} />,
    },
  ];

  const itemsUser = [
    {
      label: "Sign Out",
      url: "/login",
      icon: <LoginOutlined size={25} />,
    },
    {
      label: "Register",
      url: "/register",
      icon: <UserAddOutlined size={25} />,
    },
    {
      label: "Settings",
      url: "/user/settings",
      icon: <SettingOutlined size={25} />,
    },
  ];

  const itemsAdmin = [
    {
      label: "Admin",
      url: "/admin",
      icon: <RiAdminLine size={25} />,
    },
    {
      label: "Settings",
      url: "/settings",
      icon: <SettingOutlined size={25} />,
    },
    {
      label: "Sign Out",
      url: "/login",
      icon: <LoginOutlined size={25} />,
    },
  ];

  const items =
    auth?.roles && auth.roles.includes(5150)
      ? itemsAdmin
      : auth?.user
      ? itemsUser
      : itemsGuest;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef?.current?.contains(event.target as Node | null)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative hidden lg:inline-block">
      {auth?.user ? (
        <button
          onClick={() => setShow((curr) => !curr)}
          className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-zinc-100"
        >
          <AiOutlineUser size={25} />
          {auth?.user}
        </button>
      ) : (
        <Link
          to={"/login"}
          className="py-2 px-4 rounded-md bg-blue-600 text-white hover:text-white hover:bg-blue-500 duration-200"
        >
          Get Started
        </Link>
      )}
      <div
        className={
          (show
            ? ""
            : " -translate-y-4 opacity-0 invisible pointer-events-none") +
          " duration-200 absolute top-full right-0 flex flex-col"
        }
      >
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.url}
            className="py-2 px-4 bg-zinc-100 flex items-center gap-2"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}