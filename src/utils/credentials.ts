import type { Credential } from '../types';
import { encryptCredential, decryptCredential } from './crypto';
import { getCredentialCollection } from './database';
import { createListing, findCredential, delCredential } from './database';
import dotenv from 'dotenv';
dotenv.config();

export async function readCredentials(key: string): Promise<Credential[]> {
  const credentialCollection = getCredentialCollection();
  const encryptedCredentials = await credentialCollection.find().toArray();
  const credentials = encryptedCredentials.map((credential) =>
    decryptCredential(credential, key)
  );
  return credentials;
}

export async function getCredential(
  service: string,
  key: string
): Promise<Credential> {
  const credential = await findCredential(service);

  if (!credential) {
    throw new Error(`The service ${service} was not found.`);
  }

  const decryptedCredential = decryptCredential(credential, key);

  return decryptedCredential;
}

export async function addCredential(
  credential: Credential,
  key: string
): Promise<void> {
  const encryptedCredential = encryptCredential(credential, key);

  if (!process.env.MONGODB_URL) {
    throw new Error('No MONGODB_URL dotenv variable');
  }

  await createListing(encryptedCredential);
}

export async function deleteCredential(service: string): Promise<void> {
  if (!process.env.MONGODB_URL) {
    throw new Error('No MONGODB_URL dotenv variable');
  }
  await delCredential(service);
}

export async function updateCredential(
  service: string,
  credential: Credential,
  key: string
): Promise<void> {
  const credentialCollection = getCredentialCollection();

  const encryptedCredential = encryptCredential(credential, key);

  await credentialCollection.updateOne(
    { service },
    { $set: encryptedCredential }
  );
}
