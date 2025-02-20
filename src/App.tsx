import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import AnalyticsPage from "@/pages/analytics";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import ProtectedRoute from "./pages/auth/protected-route";

const App = () => {
  return (
    <Routes>
      <Route path="auth">
        <Route element={<SignIn />} path="sign-in" />
        <Route element={<SignUp />} path="sign-up" />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<IndexPage />} path="home" />
        <Route element={<AnalyticsPage />} path="analytics" />
      </Route>
    </Routes>
  );
};

export default App;
