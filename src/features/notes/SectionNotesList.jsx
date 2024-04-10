import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import CardNoteTitle from "./CardNoteTitle";
import CardAddNote from "./CardAddNote";
import CardNote from "./CardNote";

const SectionNotesList = () => {
  return (
    <div className="flex flex-col flex-wrap flex-1 w-full gap-3 py-3"></div>
  );
};

export default SectionNotesList;
