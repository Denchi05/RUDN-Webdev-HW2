import { Navigate, Route, Routes } from "react-router-dom";
import AppHeader from "./components/AppHeader/AppHeader";
import BoardPage from "./pages/BoardPage/BoardPage";
import CreateTaskPage from "./pages/CreateTaskPage/CreateTaskPage";
import TaskPage from "./pages/TaskPage/TaskPage";

export default function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="/tasks/new" element={<CreateTaskPage />} />
        <Route path="/tasks/:id" element={<TaskPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
