import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function Pagination({ page, count }) {
  return (
    <div>
      <button>
        <BiChevronLeft />
      </button>
      <button>
        <BiChevronRight />
      </button>
    </div>
  );
}
