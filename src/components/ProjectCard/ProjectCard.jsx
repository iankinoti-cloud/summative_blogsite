import { useNavigate } from 'react-router-dom';
import styles from './ProjectCard.module.css';

function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();

  function handleCardClick() {
    navigate(`/projects/${project.id}`);
  }

  function handleDeleteClick(e) {
    e.stopPropagation();
    if (window.confirm(`Remove "${project.title}" from your portfolio?`)) {
      onDelete(project.id);
    }
  }

  return (
    <article className={styles.card} onClick={handleCardClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className={styles.imageWrapper}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.imageOverlay}></div>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.date}>
            {new Date(project.dateAdded).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.description}>{project.description}</p>
        <ul className={styles.techList}>
          {project.techStack.map((tech) => (
            <li key={tech} className={styles.techTag}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.footer}>
        <span className={styles.viewLink}>View Details</span>
        <button
          className={styles.deleteBtn}
          onClick={handleDeleteClick}
          aria-label={`Delete ${project.title}`}
          title="Remove project"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;
