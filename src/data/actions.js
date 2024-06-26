export const ACTIONS = {
  GET_LISTS: "GET_LISTS",
  CREATE_LIST: "CREATE_LIST",
  REMOVE_LIST: "REMOVE_LIST",
  UPDATE_LIST: "UPDATE_LIST",
  GET_LIST_SUMMARY: "GET_LIST_SUMMARY",

  GET_TASKS_LIST: "GET_TASKS_LIST",
  GET_TASKS_TODAY: "GET_TASKS_TODAY",
  GET_TASKS_WEEK: "GET_TASKS_WEEK",
  GET_TASKS_IMPORTANT: "GET_TASKS_IMPORTANT",
  GET_TASKS_OVERDUE: "GET_TASKS_OVERDUE",

  CREATE_TASK: "CREATE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  REMOVE_TASK: "REMOVE_TASK",

  UPDATE_TASK_TITLE: "UPDATE_TASK_TITLE",
  UPDATE_TASK_COMPLETE: "UPDATE_TASK_COMPLETE",
  UPDATE_TASK_DETAILS: "UPDATE_TASK_DETAILS",
  UPDATE_TASK_PRIORITY: "UPDATE_TASK_PRIORITY",
  UPDATE_TASK_DUEDATE: "UPDATE_TASK_DUEDATE",

  GET_TAGS_ALL: "GET_TAGS_ALL",
  GET_TAGS_TASK: "GET_TAGS_TASK",
  CREATE_TAG: "CREATE_TAG",
  UPDATE_TAG: "UPDATE_TAG",
  REMOVE_TAG: "REMOVE_TAG",

  NOTES_GET_USER: "NOTES_GET_USER",
  NOTES_CREATE: "NOTES_CREATE",
  NOTES_UPDATE: "NOTES_UPDATE",
  NOTES_REMOVE: "NOTES_REMOVE",
  NOTES_GET_ALL: "NOTES_GET_ALL",

  JOURNAL_GET: "JOURNAL_GET",
  JOURNAL_CREATE: "JOURNAL_CREATE",
  JOURNAL_UPDATE: "JOURNAL_UPDATE",
  JOURNAL_DELETE: "JOURNAL_DELETE",

  ACTIVITY_GET: "ACTIVITY_GET",
  ACTIVITY_CREATE: "ACTIVITY_CREATE",
  ACTIVITY_UPDATE: "ACTIVITY_UPDATE",
  ACTIVITY_DELETE: "ACTIVITY_DELETE",

  ACTIVITY_TASK_GET: "ACTIVITY_TASK_GET",
  ACTIVITY_TASK_CREATE: "ACTIVITY_TASK_CREATE",
  ACTIVITY_TASK_UPDATE: "ACTIVITY_TASK_UPDATE",
  ACTIVITY_TASK_DELETE: "ACTIVITY_TASK_DELETE",

  USER_EDIT_NAME: "EDIT_NAME",
  USER_EDIT_EMAIL: "EDIT_EMAIL",
  USER_EDIT_ROLES: "EDIT_ROLES",
  SIGNIN: "SIGNIN",
  SIGNUP: "SIGNUP",
};

export const SERVER = {
  GET_LISTS: "/lists/get",
  CREATE_LIST: "/lists/create",
  REMOVE_LIST: "/lists/remove",
  UPDATE_LIST: "/lists/update",
  GET_LIST_SUMMARY: "/lists/summary",

  TASKS: "/tasks/main",
  TASKS_USER: "/tasks/user",
  TASKS_ALL: "/tasks/getAll",

  JOURNAL: "/journal",
  NOTES: "/notes",
  ACTIVITY: "/activity",
  ACTIVITY_TASK: "/activity/task",

  GET_TASKS_TODAY: "/tasks/getToday",
  GET_TASKS_WEEK: "/tasks/getWeek",
  GET_TASKS_IMPORTANT: "/tasks/getImportant",
  GET_TASKS_OVERDUE: "/tasks/getOverdue",

  GET_TAGS_ALL: "/tags/getAll",
  GET_TAGS_TASK: "/tags/getTask",
  CREATE_TAG: "/tags/create",
  UPDATE_TAG: "/tags/update",
  REMOVE_TAG: "/tags/remove",

  NOTES_GET_ALL: "/notes/getNotes",

  USER_SIGNIN: "/user/auth",
  USER_SIGNUP: "/user/register",
  USER_SIGNOUT: "/user/logout",
  GET_USER: "/user/admin",
  GET_USER_SETTINGS: "/user/settings",
  USER_EDIT_SETTINGS: "/user/settings",
  USER_PWD: "/user/pwd",
};
