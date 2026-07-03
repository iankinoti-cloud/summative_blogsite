import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectList from '../components/ProjectList/ProjectList';
import KineticTextLoader from '../components/ui/KineticTextLoader/KineticTextLoader';
import DoubleStairs from '../components/ui/DoubleStairs/DoubleStairs';
import useProjects from '../hooks/useProjects';
import styles from './HomePage.module.css';

const INTRO_KEY = 'ian-intro-seen';

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return true;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, '1');
  } catch {
    // private-mode storage failures just mean the intro may replay
  }
}

function HomePage() {
  const { projects, loading, error, deleteProject } = useProjects();
  const [search, setSearch] = useState('');
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro());

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className={styles.main}>
      {showIntro && (
        <KineticTextLoader
          active={loading}
          onExited={() => {
            markIntroSeen();
            setShowIntro(false);
          }}
        />
      )}

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroLabel}>Hi, I&apos;m Ian Kinoti</p>
          <h1 className={styles.heroTitle}>Projects that I&apos;ve Built</h1>
          <p className={styles.heroSubtitle}>
            Full-stack developer passionate about building useful web tools and applications.
            Here&apos;s a curated look at my projects-from dashboards and SPAs to developer utilities.
          </p>
          <Link to="/add" className={styles.heroCta}>
            Add a New Project
          </Link>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.toolbar}>
          <p className={styles.count}>
            {loading ? 'Loading...' : `${filtered.length} project${filtered.length !== 1 ? 's' : ''}`}
          </p>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search by name or technology..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search projects"
          />
        </div>

        {error && (
          <div className={styles.errorState} role="alert">
            <p className={styles.errorTitle}>Could not load projects.</p>
            <p className={styles.errorMsg}>{error} — Make sure the API server is running on port 3001.</p>
          </div>
        )}

        {loading && !error && (
          <div className={styles.loadingState}>
            <DoubleStairs size={56} label="Loading projects" />
            <p className={styles.loadingText}>Loading projects…</p>
          </div>
        )}

        {!loading && !error && (
          <ProjectList projects={filtered} onDelete={deleteProject} />
        )}
      </section>
    </main>
  );
}

export default HomePage;
