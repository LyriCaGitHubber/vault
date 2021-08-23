import React from 'react';
import { Credential } from '../../types';
import styles from './CredentialCards.module.css';

type CredentialCardProps = {
  props: Credential;
  onDeleteClick: (service: string) => void;
};

export default function CredentialCards({
  props,
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
        <p>{`Service : ${checkValues(props.service)}`}</p>
        <p>{`Username: ${checkValues(props.username)}`}</p>
        <p>{`Password: ${checkValues(props.password)}`}</p>
        <button onClick={() => onDeleteClick(props.service)}>❌</button>
      </section>
    </>
  );
}
