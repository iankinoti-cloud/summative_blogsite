import cx from '../../../lib/cx';
import styles from './TextRoll.module.css';

/**
 * Rolling label adapted from Skiper UI's Skiper58 to CSS Modules.
 * Two stacked copies of each letter sit inside an overflow mask; hovering
 * or focusing the nearest `.trigger` ancestor (apply `TextRoll.module.css`'s
 * `trigger` class to the link) rolls the accent copy in with a small
 * per-letter stagger. Screen readers get one plain copy of the text.
 */
function TextRoll({ children, className }) {
  const text = String(children);
  return (
    <span className={cx(styles.roll, className)}>
      <span className={styles.srOnly}>{text}</span>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className={styles.unit}
          style={{ '--i': i }}
          aria-hidden="true"
        >
          <span className={styles.face}>{ch}</span>
          <span className={cx(styles.face, styles.faceUnder)}>{ch}</span>
        </span>
      ))}
    </span>
  );
}

export default TextRoll;
