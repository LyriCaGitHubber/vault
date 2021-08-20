import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { Credential } from '../../../types';
import CredentialCards from '../../components/CredentialCards';
import AddCredential from '../../components/AddCredential';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterPassword, setMasterpassword] = useState('');

  async function fetchCredentials() {
    const response = await fetch('/api/credentials', {
      headers: {
        Authorization: masterPassword,
      },
    });
    const credentials = await response.json();

    setCredentials(credentials);
  }

  useEffect(() => {
    if (!masterPassword) {
      setCredentials([]);
    }
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
        <button onClick={fetchCredentials}>Log in</button>
        <div className="passwords">
          {credentials.length !== 0 &&
            credentials.map((credential) => (
              <CredentialCards props={credential} />
            ))}
        </div>
      </main>
    </>
  );
}
