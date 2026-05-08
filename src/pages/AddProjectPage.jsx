import { Link } from 'react-router-dom';
import AddProjectForm from '../components/AddProjectForm/AddProjectForm';
import useProjects from '../hooks/useProjects';
import styles from './AddProjectPage.module.css';

function AddProjectPage() {
  const { addProject } = useProjects();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to="/" className={styles.backLink}>
            Back to Projects
          </Link>
          <h1 className={styles.title}>Add a New Project</h1>
          <p className={styles.subtitle}>
            Fill in the details below to add a project to your portfolio. Fields marked with an asterisk are required.
          </p>
        </div>
        <div className={styles.formWrapper}>
          <AddProjectForm onAdd={addProject} />
        </div>
      </div>
    </main>
  );
}

export default AddProjectPage;
