import React from 'react';
import { Credential } from '../../types';
import styles from './CredentialCards.module.css';

type CredentialCardProps = {
  props: Credential;
};

export default function CredentialCards({
  props,
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
        <p>X</p>
      </section>
    </>
  );
}
