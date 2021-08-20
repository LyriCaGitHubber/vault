import React from 'react';
import { Credential } from '../../types';

type CredentialCardProps = {
  props: Credential;
};

export default function CredentialCards({
  props,
}: CredentialCardProps): JSX.Element {
  return (
    <>
      <section>
        <p>{props.service}</p>
        <p>{props.userName}</p>
        <p>{props.password}</p>
      </section>
      <p>X</p>
    </>
  );
}
