import { Route, Routes } from "react-router-dom";
// Imported Styles
import "./styles/styles.css";
import "./styles/main.css";
import "./styles/preflight.css";
// Imported Context
import { AuthProvider } from "./context/AuthProvider";
import { GlobalProvider } from "./context/GlobalState";
import { UserProvider } from "./context/UserState";
// Authorization & Nav
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import Layout from "./features/layout/Layout";
// Imported Components
import HomePage from "./views/HomePage";
import SigninPage from "./views/auth/SigninPage";
import SignupPage from "./views/auth/SignupPage";
import SettingsPage from "./views/user/SettingsPage";
import ChangePassword from "./views/auth/ChangePassword";
import AdminPage from "./views/admin/AdminPage";
import MissingPage from "./views/MissingPage";
import Unauthorized from "./views/auth/Unauthorized";
import NotesPage from "./views/user/NotesPage";
import TasksPage from "./views/user/TasksPage";
import CreateList from "./features/createTaskList/CreateList";
import UserListsPage from "./views/user/UserListsPage";
import TasksTodayPage from "./views/user/TasksTodayPage";
import TasksWeekPage from "./views/user/TasksWeekPage";
import TasksImportantPage from "./views/user/TasksImportantPage";
import TasksOverduePage from "./views/user/TasksOverduePage";
import TaskListPage from "./views/user/TaskListPage";
import JournalPage from "./views/user/JournalPage";
import ForgotPasswordPage from "./views/auth/ForgotPasswordPage";
import AdminTasks from "./views/admin/AdminTasks";
import AdminNotes from "./views/admin/AdminNotes";
import AdminLists from "./views/admin/AdminLists";
import AdminUsers from "./views/admin/AdminUsers";
import LayoutAdmin from "./features/layout/LayoutAdmin";
import DashboardPage from "./views/user/DashboardPage";
import CalendarPage from "./views/user/CalendarPage";

const ROLES = {
  User: 2001,
  Admin: 5150,
};

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <GlobalProvider>
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="/" element={<Layout />}>
                {/* Pages visible to all */}
                <Route path="login" element={<SigninPage />} />
                <Route path="register" element={<SignupPage />} />
                <Route path="forgotpassword" element={<ForgotPasswordPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* Pages available to users */}
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />
                  }
                >
                  <Route index element={<HomePage />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="mylists" element={<UserListsPage />} />
                  <Route path="taskList?/:id" element={<TaskListPage />} />
                  <Route path="tasks" element={<TasksPage />} />
                  <Route path="journal" element={<JournalPage />} />
                  <Route path="notes" element={<NotesPage />} />
                  <Route path="createList" element={<CreateList />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="changePWD" element={<ChangePassword />} />
                  <Route path="tasks/today" element={<TasksTodayPage />} />
                  <Route path="tasks/week" element={<TasksWeekPage />} />
                  <Route
                    path="tasks/important"
                    element={<TasksImportantPage />}
                  />
                  <Route path="tasks/overdue" element={<TasksOverduePage />} />
                </Route>

                {/* Admin page available to admin */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="admin" element={<LayoutAdmin />}>
                    <Route index element={<AdminPage />} />
                    <Route path="tasks" element={<AdminTasks />} />
                    <Route path="notes" element={<AdminNotes />} />
                    <Route path="lists" element={<AdminLists />} />
                    <Route path="users" element={<AdminUsers />} />
                  </Route>
                </Route>
              </Route>
              {/* catch all */}
              <Route path="*" element={<MissingPage />} />
            </Route>
          </Routes>
        </GlobalProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
