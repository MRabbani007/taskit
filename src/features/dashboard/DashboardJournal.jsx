import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function DashboardJournal() {
  return (
    <article className="flex-1 min-w-[300px] min-h-[200px]">
      <h2 className="py-2 px-4 bg-gradient-to-l from-green-300 to-green-100 text-zinc-800 ">
        Journal
      </h2>
      <div className="w-full flex justify-center items-center h-full">
        <Button type="primary" title="Go to Journal">
          <Link to="/journal">Add activities for today</Link>
        </Button>
      </div>
    </article>
  );
}
