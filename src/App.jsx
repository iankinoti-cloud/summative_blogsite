import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import AddProjectPage from './pages/AddProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddProjectPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route
          path="*"
          element={
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem', gap: '0.75rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>404 — Page Not Found</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>The page you are looking for does not exist.</p>
            </div>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
