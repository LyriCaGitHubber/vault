import { writeFile } from 'fs/promises';
import { readFile } from 'fs/promises';
import { DB, Credential } from '../types';

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const credentials = db.credentials;
  return credentials;
}

export async function getCredential(service: string): Promise<Credential> {
  const credentials = await readCredentials();
  console.log(credentials);
  const credential = credentials.find(
    (credential) => credential.service === service
  );

  if (!credential) {
    throw new Error(`The service ${service} was not found.`);
  }

  return credential;
}

export async function addCredential(credential: Credential): Promise<void> {
  //get existing credentials
  const credentials = await readCredentials();
  //add argument to existing credentials
  const newCredentials = [...credentials, credential];
  // create new DB
  const newDB: DB = {
    credentials: newCredentials,
  };
  const newJSON = JSON.stringify(newDB, null, 2);
  //overwrite DB using writeFile
  return writeFile('src/db.json', newJSON, 'utf-8');
}
