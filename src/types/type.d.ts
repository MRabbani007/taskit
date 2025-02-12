type Task = {
  id: string;
  listID: string;
  sortIndex: number;
  plannerSortIndex: number;
  title: string;
  details: string;
  status: string;
  completed: boolean;
  priority: string;
  priorityLevel: number;
  createDate: Date;
  dueDate: Date;
  prevDueDate: Date;
  tags: { _id: string; name: string }[];
  color?: string;
  link?: string;
  linkText?: string;
};

type Tag = { name: string; _id: string };

type TaskList = {
  id: string;
  title: string;
  subTitle: string;
  detail: string;
  icon: string;
  pinned: boolean;
  tasks?: Task[];
  trash: boolean;
};

type Note = {
  id: string;
  sortIndex: number;
  title: string;
  details: string;
  priority: string;
  tags: string[];
  trash: boolean;
  createDate: Date;
};

type JournalItem = {
  id: string;
  title: string;
  detail: string;
  color: string;
  onDate: Date;
  planDate: Date;
  timeFrom: "";
  timeTo: "";
  createDate: Date;
};

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

type User = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  roles: number[];
  createDate: Date;
};
