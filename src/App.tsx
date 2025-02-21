import { Route, Routes } from "react-router-dom";

import AnalyticsPage from "@/pages/analytics";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import ProtectedRoute from "./pages/auth/protected-route";
import PlannerPage from "./pages/planner";
import IndexPage from "./pages/home";
import SettingsPage from "./pages/settings";

const App = () => {
  return (
    <Routes>
      <Route path="auth">
        <Route element={<SignIn />} path="sign-in" />
        <Route element={<SignUp />} path="sign-up" />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<IndexPage />} path="home" />
        <Route element={<PlannerPage />} path="planner" />
        <Route element={<AnalyticsPage />} path="analytics" />
        <Route element={<SettingsPage />} path="settings">
          <Route path="profile" element={<h2>Account</h2>} />
          <Route path="general" element={<h2>General</h2>} />
        </Route>
      </Route>
      <Route path="*" element={<IndexPage />} />
    </Routes>
  );
};

export default App;
