import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function DashboardJournal() {
  return (
    <article className="flex-1 min-w-[300px] min-h-[200px] shadow-md rounded-md shadow-slate-400">
      <h2 className="border-b-2 py-2 px-4 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-t-md">
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
