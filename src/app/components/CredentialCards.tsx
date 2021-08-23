import React from 'react';
import type { Credential } from '../../types';
import styles from './CredentialCards.module.css';

type CredentialCardProps = {
  credentialData: Credential;
  onDeleteClick: (service: string) => void;
};

export default function CredentialCards({
  credentialData,
  onDeleteClick,
}: CredentialCardProps): JSX.Element {
  function checkValues(value: string) {
    if (value === '') {
      return 'No value set';
    } else {
      return `${value}`;
    }
  }
  return (
    <>
      <section className={styles.credentialCard}>
        <p>{`Service : ${checkValues(credentialData.service)}`}</p>
        <p>{`Username: ${checkValues(credentialData.username)}`}</p>
        <p>{`Password: ${checkValues(credentialData.password)}`}</p>
        <button onClick={() => onDeleteClick(credentialData.service)}>
          ❌
        </button>
      </section>
    </>
  );
}
