import { useContext, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { JournalContext } from "../../context/JournalState";
import { getDate } from "../../data/utils";
import { toast } from "react-toastify";

const CreateJournal = () => {
  const { handleJournalCreate } = useContext(JournalContext);

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [date, setDate] = useState(getDate());
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "" && detail === "") {
      return;
    } else {
      const journal = {
        id: crypto.randomUUID(),
        title,
        detail,
        onDate: date,
        planDate: date,
        timeFrom: "",
        timeTo: "",
      };
      await handleJournalCreate(journal);
      toast.success("Item added");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex-1 flex flex-wrap flex-col sm:flex-row items-center justify-center gap-2"
      name={"create_journal"}
    >
      <div className="field">
        <label htmlFor="journal_title" className="field__label">
          Title
        </label>
        <input
          id="journal_title"
          name="journal_title"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="journal_detail" className="field__label">
          Activity
        </label>
        <input
          id="journal_detail"
          name="journal_detail"
          placeholder="Activity, Event..."
          type="text"
          value={detail}
          onChange={(e) => {
            setDetail(e.target.value);
          }}
          className="field__input"
        />
      </div>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {/* <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      /> */}
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
