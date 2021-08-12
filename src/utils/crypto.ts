import CryptoJS from 'crypto-js';
import { Credential } from '../types';

export function encryptCredential(credential: Credential): Credential {
  const enryptedPassword = CryptoJS.TripleDES.encrypt(
    credential.password,
    'MySecretkey'
  ).toString();

  const encryptedCredential = {
    ...credential,
    password: enryptedPassword,
  };
  return encryptedCredential;
}
