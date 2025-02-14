export const T_TASK: Task = {
  id: "",
  listID: "",
  userID: "",

  sortIndex: 0,
  plannerSortIndex: 0,

  title: "",
  task: "",
  details: "",
  notes: "",

  status: "",
  completed: false,
  completedAt: null,

  priority: "low",
  priorityLevel: 1,
  dueDate: new Date(),
  prevDueDate: new Date(),

  tags: [],
  color: "",
  link: "",
  linkText: "",

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const T_TASKLIST: TaskList = {
  id: "",
  userID: "",

  title: "",
  subTitle: "",
  detail: "",

  pinned: false,

  icon: "",

  tasks: [],
  trash: false,

  createdAt: new Date(),
  updatedAt: new Date(),
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
