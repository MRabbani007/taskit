import React from "react";
import Logo from "../../assets/todo.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full flex flex-wrap flex-col sm:flex-row gap-4 p-6 bg-zinc-200 border-t-[1px] border-sky-600">
      <Link to="/" title="Home Page" className="flex items-center gap-1">
        <img src={Logo} alt="Logo" className="w-12" />
        Todo
      </Link>
    </div>
  );
}
