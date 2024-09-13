import React from "react";
import Logo from "../../assets/todo.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex flex-wrap flex-col sm:flex-row items-center justify-between gap-4 py-2 px-6 border-t-[1px] border-sky-600 bg-zinc-200">
      <Link to="/" title="Home Page" className="flex items-center gap-1">
        <img src={Logo} alt="Logo" className="w-12" />
        <span className="font-bold text-xl">Taskit</span>
      </Link>
      <p className="text-zinc-800 font-mono flex items-center">
        <span className="text-xl">&#169;</span> 2024 Taskit Inc. All rights
        reserved.
      </p>
    </div>
  );
}
