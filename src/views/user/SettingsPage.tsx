import { UserContext } from "@/context/UserState";
import PageHeader from "@/features/components/PageHeader";
import RadioGroup from "@/features/components/RadioGroup";
import SelectField from "@/features/components/SelectField";
import { useContext, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

const sortDirections = [
  { label: "Ascending", value: "1" },
  { label: "Descending", value: "-1" },
];

const listSortOptions = [
  { label: "Update Date", value: "updatedAt" },
  { label: "Create Date", value: "createdAt" },
  { label: "Title", value: "title" },
  { label: "Custom Sort", value: "sortIndex" },
];

const taskViewOptions = [
  { label: "Grid / Board", value: "board" },
  { label: "List", value: "list" },
];

const taskSortOptions = [
  { label: "Update Date", value: "updatedAt" },
  { label: "Create Date", value: "createdAt" },
  { label: "Title", value: "title" },
  { label: "Priority", value: "priorityLevel" },
  { label: "Flag Color", value: "color" },
  { label: "Custom Sort", value: "sortIndex" },
];

export default function SettingsPage() {
  const { userSettings, updateUserSettings } = useContext(UserContext);

  const [defaultList, setDefaultList] = useState("inbox");

  const [listSort, setListSort] = useState(listSortOptions[0].value);
  const [listSortDir, setListSortDir] = useState("1");

  const [taskView, setTaskView] = useState(userSettings?.taskView ?? "board");

  const [taskSort, setTaskSort] = useState("");
  const [taskSortDir, setTaskSortDir] = useState("1");

  const [taskReminders, setTaskReminders] = useState(true);
  const [taskPrioritization, setTaskPrioritization] = useState(true);
  const [taskSorting, setTaskSorting] = useState("due_date");

  const [markdownSupport, setMarkdownSupport] = useState(true);
  const [richTextEditor, setRichTextEditor] = useState(false);
  const [autoSaveNotes, setAutoSaveNotes] = useState(true);
  const [noteSorting, setNoteSorting] = useState("last_modified");

  const [theme, setTheme] = useState("light");

  const onSubmit = () => {
    updateUserSettings({ taskView });
  };

  return (
    <main className="">
      <PageHeader
        className=""
        pageTitle="Settings"
        icon={<IoSettingsOutline size={25} />}
      ></PageHeader>
      <div className="space-y-4 text-gray-400">
        <div className="flex flex-col gap-4">
          {/* Lists Settings */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Lists Settings
            </h2>
            <div className="space-y-4">
              <p>List Sorting</p>
              <SelectField
                label="Sort by"
                options={listSortOptions}
                value={listSort}
                onValueChange={(val) => setListSort(val)}
                className="md:grid-cols-1 md:gap-0"
              />
              <RadioGroup
                name="listSortDir"
                title="Sort Direction"
                options={sortDirections}
                value={listSortDir}
                onChange={(val) => setListSortDir(val)}
              />
            </div>
          </div>
          {/* Tasks Settings */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Tasks Settings
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <RadioGroup
                  name="taskView"
                  title="Display"
                  options={taskViewOptions}
                  value={taskView}
                  onChange={(val) => setTaskView(val)}
                />
              </div>
              <p>Task Sorting</p>
              <SelectField
                label="Sort by"
                options={taskSortOptions}
                value={taskSort}
                onValueChange={(val) => setTaskSort(val)}
                className="md:grid-cols-1 md:gap-0"
              />
              <RadioGroup
                name="taskSortDir"
                title="Sort Direction"
                options={sortDirections}
                value={taskSortDir}
                onChange={(val) => setTaskSortDir(val)}
              />
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
        className="mx-auto py-2 px-4 bg-zinc-400 hover:bg-zinc-300 duration-200 rounded-md"
      >
        Save
      </button>
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
