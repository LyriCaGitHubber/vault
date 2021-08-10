import { readFile } from 'fs/promises';
import { DB } from '../types';

export async function readCredentials(): Promise<DB[]> {
  const promise = await readFile('src/db.json', 'utf-8');
  const db = JSON.parse(promise);
  const credentials = db.credentials;
  console.log(credentials);
  return credentials;
}
