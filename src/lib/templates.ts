export const T_TASK: Task = {
  id: "",
  listID: "",
  sortIndex: 0,
  plannerSortIndex: 0,
  title: "",
  details: "",
  status: "",
  completed: false,
  priority: "low",
  priorityLevel: 1,
  dueDate: new Date(),
  prevDueDate: new Date(),
  createDate: new Date(),
  tags: [],
  color: "",
  link: "",
  linkText: "",
};

export const T_TASKLIST: TaskList = {
  id: "",
  title: "",
  subTitle: "",
  detail: "",
  pinned: false,
  icon: "",
  trash: false,
  tasks: [],
};

export const T_NOTE: Note = {
  id: "",
  title: "",
  details: "",
  priority: "",
  sortIndex: 0,
  tags: [],
  trash: false,
  createDate: new Date(),
};

export const T_JOURNAL: JournalItem = {
  id: "",
  title: "",
  detail: "",
  onDate: new Date(),
  planDate: new Date(),
  timeFrom: "",
  timeTo: "",
  color: "",
  createDate: new Date(),
};
