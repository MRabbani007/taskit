import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";

export default function UserMenu() {
  const { auth } = useAuth();
  const [show, setShow] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const itemsGuest = [
    {
      label: "Sign In",
      url: "/login",
      icon: <IoMdLogIn size={25} />,
    },
    {
      label: "Register",
      url: "/register",
      icon: <AiOutlineUserAdd size={25} />,
    },
  ];

  const itemsUser = [
    {
      label: "Settings",
      url: "/user/settings",
      icon: <IoSettingsOutline size={25} />,
    },
    {
      label: "Sign Out",
      url: "/login",
      icon: <IoMdLogOut size={25} />,
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
      url: "/user/settings",
      icon: <IoSettingsOutline size={25} />,
    },
    {
      label: "Sign Out",
      url: "/login",
      icon: <IoMdLogOut size={25} />,
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
    <div ref={dropdownRef} className="relative hidden lg:flex">
      {auth?.user ? (
        <button
          onClick={() => setShow((curr) => !curr)}
          className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-zinc-300/20"
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
            : " -translate-y-4 opacity-0 invisible pointer-events-none ") +
          " duration-200 absolute top-full right-0 flex flex-col rounded-md overflow-clip w-[200px] text-zinc-900"
        }
      >
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.url}
            className="py-2 px-4 bg-zinc-100 hover:bg-zinc-200 duration-200 flex items-stretch gap-2"
          >
            {item.icon}
            <p>{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
