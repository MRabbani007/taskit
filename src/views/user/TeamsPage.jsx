import React from "react";
import { GrGroup } from "react-icons/gr";

export default function TeamsPage() {
  return (
    <main>
      <header className="border-b-[1px] bg-zinc-100 border-blue-600 text-blue-600">
        <div>
          <GrGroup size={40} />
          <h1 className="font-light">Teams</h1>
        </div>
      </header>
      <div></div>
    </main>
  );
}
