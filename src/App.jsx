import { Route, Routes } from "react-router-dom";
// Imported Styles
import "./styles/styles.css";
import "./styles/appStyles.css";
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
import SigninPage from "./views/SigninPage";
import SignupPage from "./views/SignupPage";
import SettingsPage from "./views/SettingsPage";
import ChangePassword from "./views/ChangePassword";
import AdminPage from "./views/AdminPage";
import MissingPage from "./views/MissingPage";
import Unauthorized from "./views/Unauthorized";

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
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* Pages available to users */}
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />
                  }
                >
                  <Route index element={<HomePage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="changePWD" element={<ChangePassword />} />
                </Route>

                {/* Admin page available to admin */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="admin" element={<AdminPage />} />
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
