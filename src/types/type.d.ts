type Task = {
  id: string;
  listID: string;
  userID: string;

  sortIndex: number;
  plannerSortIndex: number;

  title: string;
  task: string; // new
  details: string;
  notes?: string;

  status: string;
  completed: boolean;
  completedAt?: Date | null;

  priority: string;
  priorityLevel: number;

  dueDate: Date;
  prevDueDate: Date;

  tags: { _id: string; name: string }[];
  color?: string;
  link?: string;
  linkText?: string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
};

type Tag = { name: string; _id: string };

type TaskList = {
  id: string;
  userID: string;

  title: string;
  subTitle: string;
  detail: string;

  icon: string;
  pinned: boolean;

  tasks?: Task[];
  trash: boolean;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
};

type Note = {
  id: string;
  sortIndex: number;

  title: string;
  details: string;

  priority: string;
  tags: string[];

  isOpen: boolean;
  trash: boolean;

  createdAt: Date;
  updatedAt: Date;
};

type JournalItem = {
  id: string;
  userID: string;

  title: string;
  task: string;
  detail: string;
  notes?: string;

  color: string;
  planDate: Date;
  onDate: Date;

  timeFrom: "";
  timeTo: "";
  createDate: Date;

  createdAt?: Date;
  updatedAt?: Date;
};

type JournalCategory = { _id: string; count: number };

type FetchStatus = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
};

type TasksSummary = {
  today: number;
  week: number;
  overdue: number;
  important: number;
  completed: number;
  pending: number;
  total: number;
};

type ListSummary = {
  _id: string;
  total: number;
  pending: number;
  todayTasks: number;
  thisWeek: number;
  highPriority: number;
  overdue: number;
};

type PlannerTab = {
  id: string | number | null;
  title: string;
  value: string;
  className?: string;
  type: string;
  index: number;
  length: number;
};

type DragItem = {
  id: string | null;
  type: string | null;
  index: number | null;
};

type DragOverItem = {
  id: string | number | null;
  type: string | null;
  value: string;
  index: number | null;
  length: number | null;
};

type MoveItem =
  | ({
      status: string;
      plannerSortIndex: number | null;
    } & Task)
  | undefined;

type UserProfile = {
  id: string;
  firstname: string;
  lastname: string;
  profileEmail: string;
  bio?: string;
  profileImage?: string;
  phoneNumber?: string;
  city?: string;
  country?: string;
  careerTrade?: string;
};

type UserAccount = {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  emailVerifiedDate?: Date;
  roles: number[];

  createdAt?: Date;
  updatedAt?: Date;
};

type UserSettings = {
  listSort: string;
  listSortDir: string;
  taskDisplay: string;
  taskSort: string;
  taskSortDir: string;
  notesSort: string;
  notesSortDir: string;
  darkMode: string;
};
