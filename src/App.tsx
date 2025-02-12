import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import AnalyticsPage from "@/pages/analytics";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<AnalyticsPage />} path="/analytics" />
    </Routes>
  );
}

export default App;
