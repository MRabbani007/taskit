import React, { useContext, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { getDate } from "../../data/utils";
import { JournalContext } from "../../context/JournalState";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";

const colors = ["green", "blue", "red", "grey"];

export default function FormJournalEdit({ journalItem, setEdit }) {
  const { handleJournalUpdate } = useContext(JournalContext);

  const [title, setTitle] = useState(journalItem?.title || "");
  const [detail, setDetail] = useState(journalItem?.detail || "");
  const [color, setColor] = useState(journalItem?.color || colors[0]);
  const [date, setDate] = useState(
    journalItem?.onDate.substr(0, 10) || getDate()
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { ...journalItem, title, detail, color };
    await handleJournalUpdate(newItem);
    setEdit(false);
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-zinc-100/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-200 w-fit"
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
        <select
          name="color_select"
          id="color_select"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          {colors.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <div className="flex items-center gap-4">
          <button className="text-green-600" type="submit">
            <CiSquareCheck size={32} />
          </button>
          <button className="text-yellow-500" type="reset">
            <CiSquareRemove size={32} />
          </button>
        </div>
      </form>
    </div>
  );
}
