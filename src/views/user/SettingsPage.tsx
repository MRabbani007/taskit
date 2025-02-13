import { UserContext } from "@/context/UserState";
import { useContext, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

export default function SettingsPage() {
  const { userSettings, updateUserSettings } = useContext(UserContext);

  const [taskView, setTaskView] = useState(userSettings?.taskView ?? "board");

  const [taskReminders, setTaskReminders] = useState(true);
  const [taskPrioritization, setTaskPrioritization] = useState(true);
  const [taskSorting, setTaskSorting] = useState("due_date");

  const [defaultList, setDefaultList] = useState("inbox");
  const [listOrdering, setListOrdering] = useState(true);
  const [listAutoSorting, setListAutoSorting] = useState("due_date");
  const [completedListHandling, setCompletedListHandling] = useState("archive");

  const [markdownSupport, setMarkdownSupport] = useState(true);
  const [richTextEditor, setRichTextEditor] = useState(false);
  const [autoSaveNotes, setAutoSaveNotes] = useState(true);
  const [noteSorting, setNoteSorting] = useState("last_modified");

  const [theme, setTheme] = useState("light");

  const onSubmit = () => {
    updateUserSettings({ taskView });
  };

  return (
    <main className="m-0 p-0">
      <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <header className="text-gray-800 dark:text-gray-200 flex items-center mb-6">
          <IoSettingsOutline size={30} />
          <h1 className="text-2xl font-bold">Settings</h1>
        </header>

        <div className="space-y-4 text-gray-400">
          <div className="flex flex-col gap-4">
            {/* Lists Settings */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Lists Settings
              </h2>
              <div className="space-y-3">
                <select
                  value={defaultList}
                  onChange={(e) => setDefaultList(e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="inbox">Inbox</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                </select>
                <SwitchGroup
                  label="List Ordering"
                  value={listOrdering}
                  onChange={setListOrdering}
                />
                <select
                  value={listAutoSorting}
                  onChange={(e) => setListAutoSorting(e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="due_date">Due Date</option>
                  <option value="priority">Priority</option>
                  <option value="custom">Custom</option>
                </select>
                <select
                  value={completedListHandling}
                  onChange={(e) => setCompletedListHandling(e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="archive">Archive</option>
                  <option value="complete">Mark as Complete</option>
                  <option value="keep_open">Keep Open</option>
                </select>
              </div>
            </div>
            {/* Tasks Settings */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Tasks Settings
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm">Display</p>
                  <select
                    value={taskView}
                    onChange={(e) => setTaskView(e.target.value)}
                    className="py-1 px-2 border-[1px] rounded"
                  >
                    <option value="list">List View</option>
                    <option value="board">Board View</option>
                  </select>
                </div>
                <SwitchGroup
                  label="Task Reminders"
                  value={taskReminders}
                  onChange={setTaskReminders}
                />
                <SwitchGroup
                  label="Prioritization"
                  value={taskPrioritization}
                  onChange={setTaskPrioritization}
                />
                <select
                  value={taskSorting}
                  onChange={(e) => setTaskSorting(e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="due_date">Due Date</option>
                  <option value="priority">Priority</option>
                  <option value="creation_date">Creation Date</option>
                </select>
              </div>
            </div>
            {/* Notes Settings */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Notes Settings
              </h2>
              <div className="space-y-3">
                <SwitchGroup
                  label="Markdown Support"
                  value={markdownSupport}
                  onChange={setMarkdownSupport}
                />
                <SwitchGroup
                  label="Rich Text Editor"
                  value={richTextEditor}
                  onChange={setRichTextEditor}
                />
                <SwitchGroup
                  label="Auto Save Notes"
                  value={autoSaveNotes}
                  onChange={setAutoSaveNotes}
                />
                <select
                  value={noteSorting}
                  onChange={(e) => setNoteSorting(e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="last_modified">Last Modified</option>
                  <option value="created_date">Created Date</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-gray-700 dark:text-gray-300">
                Notifications
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive task updates and reminders.
              </p>
            </div>
            {/* <Switch
            checked={notifications}
            onChange={setNotifications}
            className={`${notifications ? 'bg-blue-600' : 'bg-gray-400'}
              relative inline-flex h-6 w-11 items-center rounded-full transition`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`transform ${notifications ? 'translate-x-6' : 'translate-x-1'}
              inline-block h-4 w-4 transform bg-white rounded-full transition`}
            />
          </Switch> */}
          </div>

          {/* Theme Settings */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col gap-4">
            <div>
              <h2 className="font-semibold text-gray-700 dark:text-gray-300">
                Dark Mode
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Toggle dark mode for the app.
              </p>
            </div>
            <div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="p-2 border rounded w-full"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            {/* <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className={`${darkMode ? 'bg-blue-600' : 'bg-gray-400'}
              relative inline-flex h-6 w-11 items-center rounded-full transition`}
          >
            <span className="sr-only">Enable dark mode</span>
            <span
              className={`transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}
              inline-block h-4 w-4 transform bg-white rounded-full transition`}
            />
          </Switch> */}
          </div>
        </div>
        <button
          onClick={onSubmit}
          className="ml-auto py-2 px-4 bg-zinc-400 hover:bg-zinc-300 duration-200 rounded-md"
        >
          Save
        </button>
      </div>
    </main>
  );
}

function SwitchGroup({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex justify-start items-center gap-4">
      <span>{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`${
          value ? "bg-blue-600" : "bg-gray-400"
        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`${
            value ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform bg-white rounded-full transition`}
        />
      </button>
    </div>
  );
}
