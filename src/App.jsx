import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ModulesPage from './pages/ModulesPage';             
import CourseDetailsPage from './pages/CourseDetailsPage'; 
import ProfessorDashboard from './pages/ProfessorDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/modules" element={<ModulesPage />} />        {/* <-- Add this */}
      <Route path="/course/:id" element={<CourseDetailsPage />} /> {/* <-- Add this */}
      <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;