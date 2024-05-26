import { useState } from "react";
import { GrNotes } from "react-icons/gr";
import { SlArrowRight } from "react-icons/sl";
import CardAddNote from "../../features/notes/CardAddNote";
import { NotesProvider } from "../../context/NotesState";
import SectionNotes from "../../features/notes/SectionNotes";

const NotesPage = () => {
  const [expand, setExpand] = useState(true);

  return (
    <NotesProvider>
      <main>
        <header
          className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-white shadow-md shadow-zinc-500"
          // onClick={() => setExpand((prev) => !prev)}
        >
          <div>
            <GrNotes size={40} />
            <h1>Notes</h1>
          </div>
        </header>
        <div>
          <SectionNotes expand={expand} />
          <CardAddNote />
        </div>
      </main>
    </NotesProvider>
  );
};

export default NotesPage;
