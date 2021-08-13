import { writeFile, readFile } from 'fs/promises';
import type { DB, Credential } from '../types';
import { encryptCredential, decryptCredential } from './crypto';
import { createListing, findCredential } from './database';
import dotenv from 'dotenv';
dotenv.config();

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const credentials = db.credentials;
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
  deleteCredential(service);
}

export async function updateCredential(
  service: string,
  credential: Credential
): Promise<void> {
  // get all Credentials
  const credentials = await readCredentials();
  // modify one
  const oldDB = credentials.filter(
    (credential) => credential.service !== service
  );
  const newDB: DB = { credentials: [...oldDB, credential] };
  //overwrite DB
  const newJSON = JSON.stringify(newDB, null, 2);
  await writeFile('src/db.json', newJSON, 'utf-8');
}
