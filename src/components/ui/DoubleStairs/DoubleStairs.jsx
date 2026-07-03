import cx from '../../../lib/cx';
import styles from './DoubleStairs.module.css';

const STEPS = [0, 1, 2, 3, 4];

/**
 * Double-staircase pre-holder — two mirrored flights of steps climbing
 * toward each other. Pure CSS animation (compositor-friendly), used as
 * the reusable loading placeholder across the site.
 */
function DoubleStairs({ size = 52, className, label = 'Loading' }) {
  return (
    <div
      className={cx(styles.wrap, className)}
      role="status"
      aria-label={label}
      style={{ '--ds-size': `${size}px` }}
    >
      <div className={styles.flight}>
        {STEPS.map((i) => (
          <span key={i} className={styles.step} style={{ '--i': i }} />
        ))}
      </div>
      <div className={cx(styles.flight, styles.flightMirror)}>
        {STEPS.map((i) => (
          <span key={i} className={styles.step} style={{ '--i': i }} />
        ))}
      </div>
    </div>
  );
}

export default DoubleStairs;
