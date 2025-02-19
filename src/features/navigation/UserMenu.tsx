import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { IoSettingsOutline } from "react-icons/io5";
import { UserContext } from "@/context/UserState";
import { HiOutlineBolt } from "react-icons/hi2";
import { BsRepeat } from "react-icons/bs";
import { LuMessagesSquare } from "react-icons/lu";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GoSignOut } from "react-icons/go";
import { RiAdminLine } from "react-icons/ri";

export default function UserMenu() {
  const { auth } = useAuth();
  const { userProfile } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // const itemsGuest = [
  //   {
  //     label: "Sign In",
  //     url: "/login",
  //     icon: <IoMdLogIn size={25} />,
  //   },
  //   {
  //     label: "Register",
  //     url: "/register",
  //     icon: <AiOutlineUserAdd size={25} />,
  //   },
  // ];

  const itemsUser = [
    {
      label: "Account Settings",
      url: "/user/settings",
      icon: <IoSettingsOutline size={25} />,
    },
    {
      label: "Upgrade to Plus",
      url: "/user/settings",
      icon: <HiOutlineBolt size={25} />,
    },
    {
      label: "Help Center",
      url: "/user/settings",
      icon: <TfiHeadphoneAlt size={25} />,
    },
    {
      label: "Product Updates",
      url: "/user/settings",
      icon: <BsRepeat size={25} />,
    },
    {
      label: "Leave a feedback",
      url: "/user/settings",
      icon: <LuMessagesSquare size={25} />,
    },
  ];

  const itemsAdmin = [
    {
      label: "Admin",
      url: "/admin",
      icon: <RiAdminLine size={25} />,
    },
  ];

  const items =
    auth?.roles && auth.roles.includes(5150)
      ? [
          ...itemsAdmin,
          ...itemsUser,
          {
            label: "Sign Out",
            url: "/login",
            icon: <GoSignOut size={25} />,
          },
        ]
      : auth?.user
      ? [
          ...itemsUser,
          {
            label: "Sign Out",
            url: "/login",
            icon: <GoSignOut size={25} />,
          },
        ]
      : [];

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
    <div ref={dropdownRef} className="relative flex z-[70]">
      <button
        onClick={() => setShow((curr) => !curr)}
        className="bg-white shadow-md shadow-zinc-500 rounded-full overflow-clip"
      >
        <img
          src={userProfile?.profileImage}
          className="w-12 h-12 md:w-16 md:h-16 object-center scale-125"
        />
      </button>
      <div
        className={
          (show
            ? ""
            : " -translate-y-4 opacity-0 invisible pointer-events-none ") +
          " duration-200 absolute top-full left-0 flex flex-col rounded-md shadow-md shadow-zinc-500 overflow-clip w-[200px] text-zinc-900"
        }
      >
        <div className="flex flex-col p-4 gap-4 bg-white">
          <div className="bg-white shadow-md shadow-zinc-500 rounded-full w-fit mx-auto overflow-clip">
            <img
              src={userProfile?.profileImage}
              className="w-16 h-16 object-center scale-125"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-zinc-950">
              <span>{userProfile?.firstname}</span>
              <span> </span>
              <span>{userProfile?.lastname}</span>
            </p>
            <p className="text-xs">{userProfile?.profileEmail}</p>
          </div>
        </div>
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
