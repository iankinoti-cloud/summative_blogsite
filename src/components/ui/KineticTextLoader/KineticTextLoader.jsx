import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import DoubleStairs from '../DoubleStairs/DoubleStairs';
import styles from './KineticTextLoader.module.css';

const NAME = 'IAN KINOTI';
const EASE = [0.22, 1, 0.36, 1];

/**
 * Session-opening kinetic type loader. Shows while `active` (data loading),
 * holds at least `minDuration` so it never flashes, then slides away.
 * Tap anywhere to skip. Reduced motion: quiet fade, no letter choreography.
 */
function KineticTextLoader({ active, minDuration = 1600, onExited }) {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (active) return;
    const remaining = Math.max(0, minDuration - (Date.now() - mountedAt.current));
    const t = setTimeout(() => setVisible(false), remaining);
    return () => clearTimeout(t);
  }, [active, minDuration]);

  // Never trap the visitor — hard cap even if the fetch hangs
  useEffect(() => {
    const cap = setTimeout(() => setVisible(false), 6000);
    return () => clearTimeout(cap);
  }, []);

  return (
    <AnimatePresence onExitComplete={onExited}>
      {visible && (
        <motion.div
          key="kinetic-loader"
          className={styles.overlay}
          onClick={() => setVisible(false)}
          exit={
            reducedMotion
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { y: '-100%', transition: { duration: 0.6, ease: EASE } }
          }
          aria-hidden="true"
        >
          <div className={styles.center}>
            <div className={styles.name}>
              {NAME.split('').map((ch, i) => (
                <span key={i} className={styles.letterMask}>
                  <motion.span
                    className={styles.letter}
                    initial={reducedMotion ? { opacity: 0 } : { y: '110%', rotate: 6 }}
                    animate={reducedMotion ? { opacity: 1 } : { y: 0, rotate: 0 }}
                    transition={{
                      duration: 0.65,
                      ease: EASE,
                      delay: 0.12 + i * 0.045,
                    }}
                  >
                    {ch === ' ' ? ' ' : ch}
                  </motion.span>
                </span>
              ))}
            </div>

            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Portfolio · Loading
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <DoubleStairs size={44} label="Loading portfolio" />
            </motion.div>
          </div>

          <motion.p
            className={styles.skipHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            tap to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default KineticTextLoader;
