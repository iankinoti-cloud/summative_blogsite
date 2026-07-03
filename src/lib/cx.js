/** Join class names, skipping falsy values — the house's tiny cn() */
export default function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}
