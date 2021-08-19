import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { Credential } from '../../../types';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterPassword, setMasterpassword] = useState('');

  useEffect(() => {
    async function fetchCredentials() {
      const response = await fetch('/api/credentials', {
        headers: {
          Authorization: masterPassword,
        },
      });
      const credentials = await response.json();
      if (!masterPassword) {
        setCredentials([]);
      }
      setCredentials(credentials);
    }
    fetchCredentials();
  }, [masterPassword]);

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
          value={masterPassword}
          onChange={(event) => {
            setMasterpassword(event.target.value);
          }}
        />
        <div className="passwords">
          {credentials.length !== 0 &&
            credentials.map((credential) => (
              <div>
                <p>{credential.service}</p>
                <p>{credential.username}</p>
                <p>{credential.password}</p>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
