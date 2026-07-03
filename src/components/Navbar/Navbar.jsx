import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import TextRoll from '../ui/TextRoll/TextRoll';
import rollStyles from '../ui/TextRoll/TextRoll.module.css';
import cx from '../../lib/cx';
import styles from './Navbar.module.css';

const EASE = [0.22, 1, 0.36, 1];
const GITHUB_URL = 'https://github.com/iankinoti-cloud';

const MENU_ITEMS = [
  { label: 'Projects', to: '/', end: true },
  { label: 'Add Project', to: '/add' },
  { label: 'GitHub', href: GITHUB_URL },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  // Scroll lock + Escape while the mobile overlay is up
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    // Rotating past the breakpoint hides the overlay — release the menu too
    const desktop = window.matchMedia('(min-width: 641px)');
    const onResize = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <span className={styles.brandInitials}>IK</span>
          Ian Kinoti
        </Link>

        <ul className={styles.links}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                cx(styles.link, rollStyles.trigger, isActive && styles.linkActive)
              }
            >
              <TextRoll>Projects</TextRoll>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                cx(styles.link, rollStyles.trigger, isActive && styles.linkActive)
              }
            >
              <TextRoll>Add Project</TextRoll>
            </NavLink>
          </li>
          <li>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
              aria-label="GitHub Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.52 11.52 0 0 1 12 6.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </li>
        </ul>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={cx(styles.menuBar, menuOpen && styles.menuBarTopOpen)} />
          <span className={cx(styles.menuBar, menuOpen && styles.menuBarBottomOpen)} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.25, delay: reducedMotion ? 0 : 0.1 },
            }}
          >
            <nav className={styles.overlayNav} aria-label="Site menu">
              {MENU_ITEMS.map((item, i) => {
                const mid = (MENU_ITEMS.length - 1) / 2;
                const delay = reducedMotion ? 0 : 0.12 + Math.abs(i - mid) * 0.09;
                const inner = (
                  <motion.span
                    className={styles.overlayLinkInner}
                    initial={reducedMotion ? { opacity: 0 } : { y: '112%' }}
                    animate={
                      reducedMotion
                        ? { opacity: 1, transition: { duration: 0.3, delay } }
                        : { y: 0, transition: { duration: 0.55, ease: EASE, delay } }
                    }
                    exit={
                      reducedMotion
                        ? { opacity: 0, transition: { duration: 0.2 } }
                        : { y: '112%', transition: { duration: 0.3, ease: EASE } }
                    }
                  >
                    {item.label}
                  </motion.span>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.overlayLink}
                    onClick={closeMenu}
                  >
                    {inner}
                  </a>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cx(styles.overlayLink, isActive && styles.overlayLinkActive)
                    }
                    onClick={closeMenu}
                  >
                    {inner}
                  </NavLink>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
