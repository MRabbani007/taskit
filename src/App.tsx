import React from "react";
import { Route, Routes } from "react-router-dom";
// Imported Styles
import "./styles/styles.css";
import "./styles/main.css";
import "./styles/preflight.css";
import "react-toastify/dist/ReactToastify.css";
// Imported Context
import Providers from "./context/Providers";
// Authorization & Nav
import SigninPage from "./views/auth/SigninPage";
import SignupPage from "./views/auth/SignupPage";
import SignoutPage from "./views/auth/SignoutPage";

import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import MissingPage from "./views/MissingPage";
import Unauthorized from "./views/auth/Unauthorized";
// Layouts
import Layout from "./features/layout/Layout";
import LayoutAdmin from "./features/layout/LayoutAdmin";
import LayoutUser from "./features/layout/LayoutUser";
import LayoutActivities from "./features/layout/LayoutActivities";
// Website
import HomePage from "./views/HomePage";
// Admin
import AdminPage from "./views/admin/AdminPage";
import AdminTasksPage from "./views/admin/AdminTasksPage";
import AdminNotes from "./views/admin/AdminNotes";
import AdminUsersPage from "./views/admin/AdminUsersPage";
// Tasks
import TasksPage from "./views/user/tasks/TasksPage";
import UserListsPage from "./views/user/tasks/UserListsPage";
import TaskListPage from "./views/user/tasks/TaskListPage";
import CreateListPage from "./views/user/tasks/CreateListPage";
// Activities
import ActivitiesPage from "./views/user/activities/ActivitiesPage";
import ActivityDetailsPage from "./views/user/activities/ActivityDetailsPage";
import CreateActivityPage from "./views/user/activities/CreateActivityPage";
// Notes, Journal, Calendar
import NotesPage from "./views/user/NotesPage";
import JournalPage from "./views/user/JournalPage";
import CalendarPage from "./views/user/CalendarPage";
// User
import DashboardPage from "./views/user/DashboardPage";
import TaskPlannerPage from "./views/user/tasks/TaskPlannerPage";
import AdminListsPage from "./views/admin/AdminListsPage";
import LayoutGuest from "./features/layout/LayoutGuest";
// Imported Components
const ForgotPasswordPage = React.lazy(
  () => import("./views/auth/ForgotPasswordPage")
);
const ChangePassword = React.lazy(() => import("./views/auth/ChangePassword"));
const SettingsPage = React.lazy(() => import("./views/user/SettingsPage"));
const TeamsPage = React.lazy(() => import("./views/user/TeamsPage"));
const ProfilePage = React.lazy(() => import("./views/user/ProfilePage"));

const ROLES = {
  User: 2001,
  Admin: 5150,
};

function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            {/* Pages visible to all */}
            <Route element={<LayoutGuest />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<SigninPage />} />
              <Route path="register" element={<SignupPage />} />
              <Route path="forgotpassword" element={<ForgotPasswordPage />} />
              <Route path="unauthorized" element={<Unauthorized />} />
            </Route>
            {/* Pages available to users */}
            <Route
              element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
            >
              <Route element={<LayoutUser />}>
                <Route path="logout" element={<SignoutPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="mylists">
                  <Route index element={<UserListsPage />} />
                  <Route path="createList" element={<CreateListPage />} />
                  <Route path="taskList" element={<TaskListPage />} />
                </Route>
                <Route path="activities" element={<LayoutActivities />}>
                  <Route index element={<ActivitiesPage />} />
                  <Route path="create" element={<CreateActivityPage />} />
                  <Route
                    path="activity/:id?"
                    element={<ActivityDetailsPage />}
                  />
                </Route>
                <Route path="tasks">
                  <Route index element={<TasksPage />} />
                  <Route path="planner" element={<TaskPlannerPage />} />
                </Route>
                <Route path="pages">
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="journal" element={<JournalPage />} />
                  <Route path="notes" element={<NotesPage />} />
                </Route>
                <Route path="user">
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="changePWD" element={<ChangePassword />} />
                </Route>
                <Route path="teams" element={<TeamsPage />} />
              </Route>
            </Route>

            {/* Admin page available to admin */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<LayoutAdmin />}>
                <Route index element={<AdminPage />} />
                <Route path="tasks" element={<AdminTasksPage />} />
                <Route path="notes" element={<AdminNotes />} />
                <Route path="lists" element={<AdminListsPage />} />
                <Route path="users" element={<AdminUsersPage />} />
              </Route>
            </Route>

            {/* catch all */}
            <Route path="*" element={<MissingPage />} />
          </Route>
        </Route>
      </Routes>
    </Providers>
  );
}

export default App;
