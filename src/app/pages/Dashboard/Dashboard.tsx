import React from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  return (
    <>
      <header className={styles.dashboard__header}>
        <h1 className={styles.dashboard__headline}>
          <span>V</span>ault
        </h1>
      </header>
      <main>
        <p>Welcome to your personal vault</p>
        <input
          className={styles.dashboard__masterpassword}
          type="text"
          placeholder="Masterpassword"
        />
        <div className="passwords"></div>
      </main>
    </>
  );
}
