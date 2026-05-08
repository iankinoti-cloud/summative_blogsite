import { useNavigate } from 'react-router-dom';
import styles from './ProjectDetail.module.css';

function ProjectDetail({ project, onDelete }) {
  const navigate = useNavigate();

  function handleDelete() {
    if (window.confirm(`Remove "${project.title}" from your portfolio?`)) {
      onDelete(project.id).then(() => navigate('/'));
    }
  }

  return (
    <article className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        Back to Projects
      </button>

      <div className={styles.hero}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{project.title}</h1>
          <span className={styles.date}>
            Added{' '}
            {new Date(project.dateAdded).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>About This Project</h2>
            <p className={styles.description}>{project.description}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Technologies Used</h2>
            <ul className={styles.techList}>
              {project.techStack.map((tech) => (
                <li key={tech} className={styles.techTag}>
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Links</h3>
            <div className={styles.linkGroup}>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkBtn}
                >
                  View Live Site
                </a>
              ) : (
                <span className={styles.linkMissing}>No live URL provided</span>
              )}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.linkBtn} ${styles.linkBtnGhost}`}
                >
                  View on GitHub
                </a>
              ) : (
                <span className={styles.linkMissing}>No GitHub URL provided</span>
              )}
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Actions</h3>
            <button className={styles.deleteBtn} onClick={handleDelete}>
              Remove Project
            </button>
          </div>
        </aside>
      </div>
    </article>
  );
}

export default ProjectDetail;
