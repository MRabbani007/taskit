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

  priority: "normal",
  priorityLevel: 2,
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
  sortIndex: 0,

  title: "",
  details: "",

  priority: "",
  tags: [],

  isOpen: true,
  trash: false,

  createdAt: new Date(),
  updatedAt: new Date(),
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

export const T_USERPROFILE: UserProfile = {
  id: "",
  firstname: "",
  lastname: "",
  profileEmail: "",
  bio: "",
  city: "",
  country: "",
  phoneNumber: "",
  profileImage: "",
  careerTrade: "",
};

export const T_USERACCOUNT: UserAccount = {
  email: "",
  emailVerified: false,
  id: "",
  roles: [],
  username: "",
};

export const T_USERSETTINGS: UserSettings = {
  darkMode: "System",
  listSort: "",
  listSortDir: "",
  notesSort: "",
  notesSortDir: "",
  taskDisplay: "",
  taskSort: "",
  taskSortDir: "",
};
