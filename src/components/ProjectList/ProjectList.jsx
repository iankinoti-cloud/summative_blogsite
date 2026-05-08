import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './ProjectList.module.css';

function ProjectList({ projects, onDelete }) {
  if (projects.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>No projects yet.</p>
        <p className={styles.emptySubtitle}>Add your first project to get started.</p>
      </div>
    );
  }

  return (
    <section className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onDelete={onDelete} />
      ))}
    </section>
  );
}

export default ProjectList;
