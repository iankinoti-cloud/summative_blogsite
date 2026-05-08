import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectDetail from '../components/ProjectDetail/ProjectDetail';
import useProjects from '../hooks/useProjects';
import styles from './ProjectDetailPage.module.css';

function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteProject } = useProjects();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:3001/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Project not found.');
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className={styles.centered}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className={styles.centered}>
        <p className={styles.errorTitle}>Project not found.</p>
        <p className={styles.errorMsg}>{error}</p>
        <button className={styles.homeBtn} onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return <ProjectDetail project={project} onDelete={deleteProject} />;
}

export default ProjectDetailPage;
