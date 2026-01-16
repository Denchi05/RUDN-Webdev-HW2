import { Routes, Route, Navigate } from 'react-router-dom';
import { AppHeader } from './components/AppHeader/AppHeader';
import { BoardPage } from './pages/BoardPage/BoardPage';
import { CreateTaskPage } from './pages/CreateTaskPage/CreateTaskPage';
import { TaskPage } from './pages/TaskPage/TaskPage';

/**
 * Root component. It renders the application header and sets up the
 * client‑side routes for the three pages defined by the assignment. If
 * an unknown route is accessed, the user is redirected to `/board`.
 */
function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/board" />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/create" element={<CreateTaskPage />} />
        <Route path="/task/:id" element={<TaskPage />} />
        <Route path="*" element={<Navigate to="/board" />} />
      </Routes>
    </>
  );
}

export default App;