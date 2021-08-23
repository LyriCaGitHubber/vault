import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import type { Credential } from '../../../types';
import CredentialCards from '../../components/CredentialCards';
import { Link } from 'react-router-dom';

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

  async function deleteCredential(service: string, masterPassword: string) {
    await fetch(`/api/credentials/${service}`, {
      method: 'DELETE',
      headers: { Authentication: masterPassword },
    });
  }

  async function handleDeleteClick(service: string) {
    await deleteCredential(service, masterPassword);
    await fetchCredentials();
  }

  useEffect(() => {
    if (!masterPassword) {
      setCredentials([]);
    }
  }, [masterPassword]);

  return (
    <div className={styles.container}>
      <header className={styles.dashboard__header}>
        <h1 className={styles.dashboard__headline}>
          <span>V</span>ault
        </h1>
      </header>
      <main>
        <p>Welcome to your personal vault</p>
        <input
          className={styles.dashboard__masterpassword}
          type="password"
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
              <CredentialCards
                key={credential._id}
                credentialData={credential}
                onDeleteClick={handleDeleteClick}
              />
            ))}
        </div>
      </main>
      <footer>
        <Link to="/search">
          <img
            className={styles.searchButton}
            src="src/assets/searchButton.svg"
          />
        </Link>
        <Link to="/credential/add">
          <img className={styles.addButton} src="src/assets/addButton.svg" />
        </Link>
      </footer>
    </div>
  );
}
