import { Route, Routes } from "react-router-dom";
// Imported Styles
import "./styles/styles.css";
import "./styles/sass/main.css";
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
import CreateListPage from "./views/user/CreateListPage";
import { NotesProvider } from "./context/NotesState";
import SignoutPage from "./views/auth/SignoutPage";
import TeamsPage from "./views/user/TeamsPage";
import ActivitiesPage from "./views/user/activities/ActivitiesPage";
import ActivityDetailsPage from "./views/user/activities/ActivityDetailsPage";
import CreateActivityPage from "./views/user/activities/CreateActivityPage";
import { ActivityProvider } from "./context/ActivityState";
import LayoutActivities from "./features/layout/LayoutActivities";

const ROLES = {
  User: 2001,
  Admin: 5150,
};

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <GlobalProvider>
          <NotesProvider>
            <Routes>
              <Route element={<PersistLogin />}>
                <Route path="/" element={<Layout />}>
                  {/* Pages visible to all */}
                  <Route index element={<HomePage />} />
                  <Route path="login" element={<SigninPage />} />
                  <Route path="register" element={<SignupPage />} />
                  <Route
                    path="forgotpassword"
                    element={<ForgotPasswordPage />}
                  />
                  <Route path="unauthorized" element={<Unauthorized />} />

                  {/* Pages available to users */}
                  <Route
                    element={
                      <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />
                    }
                  >
                    <Route path="logout" element={<SignoutPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="mylists">
                      <Route index element={<UserListsPage />} />
                      <Route path="createList" element={<CreateListPage />} />
                      <Route path="taskList?/:id" element={<TaskListPage />} />
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
                      <Route path="today" element={<TasksTodayPage />} />
                      <Route path="week" element={<TasksWeekPage />} />
                      <Route
                        path="important"
                        element={<TasksImportantPage />}
                      />
                      <Route path="overdue" element={<TasksOverduePage />} />
                    </Route>
                    <Route path="teams" element={<TeamsPage />} />
                    <Route path="calendar" element={<CalendarPage />} />
                    <Route path="journal" element={<JournalPage />} />
                    <Route path="notes" element={<NotesPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="changePWD" element={<ChangePassword />} />
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

                  {/* catch all */}
                  <Route path="*" element={<MissingPage />} />
                </Route>
              </Route>
            </Routes>
          </NotesProvider>
        </GlobalProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
