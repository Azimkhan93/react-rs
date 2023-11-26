import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader__container} data-testid="loader">
      <div className={styles.loader}>
        <div className={styles.loader__dot}></div>
        <div className={styles.loader__dot}></div>
        <div className={styles.loader__dot}></div>
        <div className={styles.loader__dot}></div>
      </div>
    </div>
  );
};

export default Loader;
