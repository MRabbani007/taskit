import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";

export default function ProfilePage() {
  return (
    <main>
      <header className="bg-gradient-to-r from-zinc-200 to-zinc-400 text-sky-600">
        <div>
          <FaRegCircleUser size={40} />
          <h1 className="font-semibold">Profile</h1>
        </div>
      </header>
      <div></div>
    </main>
  );
}
