import { useContext, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { JournalContext } from "../../context/JournalState";
import { getDate } from "../../data/utils";

const CreateJournal = () => {
  const { handleJournalCreate } = useContext(JournalContext);

  const [input, setInput] = useState("");
  const [date, setDate] = useState(getDate());
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "") {
      return;
    } else {
      const journal = {
        id: crypto.randomUUID(),
        title: input,
        detail: "",
        onDate: date,
        planDate: date,
        timeFrom: "",
        timeTo: "",
      };
      handleJournalCreate(journal);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-wrap items-center justify-center gap-2"
      name={"create_journal"}
    >
      <input
        type="text"
        className="max-w-[90%] flex-1 text-lg border-2"
        value={input}
        placeholder="Activity, Event..."
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button
        className="bg-yellow-300 rounded-full w-12 h-12 m-0 p-0"
        type="submit"
      >
        <IoAddOutline className="icon" />
      </button>
    </form>
  );
};

export default CreateJournal;
