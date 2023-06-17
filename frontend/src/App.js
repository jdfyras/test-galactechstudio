import logo from "./logo.svg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page404 from "./Pages/Page404";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthPage from "./Pages/Authentification/AuthPage";
import Tasks from "./Pages/Tasks";
function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Tasks />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>
      <Route>
        <Route path="/login" element={<AuthPage />} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
