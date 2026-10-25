import { BackgroundCanvas } from "./background-canvas";

import styles from "./ambient.module.css";

/** Fixed decorative layers behind and above the page. All are aria-hidden. */
export function Ambient() {
  return (
    <>
      <BackgroundCanvas />
      <div className={styles.spot} data-spot="" aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.progress} aria-hidden="true">
        <span data-progress="" />
      </div>
    </>
  );
}
