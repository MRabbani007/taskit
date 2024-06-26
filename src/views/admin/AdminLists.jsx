import React from "react";
import { IoListOutline } from "react-icons/io5";

const AdminLists = () => {
  return (
    <main>
      <header className="bg-gradient-to-r from-zinc-200 to-zinc-400 text-sky-600">
        <div>
          <IoListOutline size={40} />
          <h1 className="font-semibold">Lists</h1>
        </div>
      </header>
      <div></div>
    </main>
  );
};

export default AdminLists;
