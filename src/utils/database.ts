import { Collection, MongoClient } from 'mongodb';
import { Credential } from '../types';
import { decryptCredential } from './crypto';

let client: MongoClient;

export async function DBConnection(url: string): Promise<void> {
  client = new MongoClient(url);
  await client.connect();
}

export function getCollection<T>(name: string): Collection<T> {
  return client.db().collection<T>(name);
}

export function getCredentialCollection(): Collection<Credential> {
  return getCollection<Credential>('credentials');
}

// CRUD functions

export async function createListing(credential: Credential): Promise<void> {
  const credentialCollection = getCredentialCollection();
  credentialCollection.insertOne(credential);
}

export async function readCredentials(key: string): Promise<Credential[]> {
  const credentialCollection = getCredentialCollection();
  const encryptedCredentials = await credentialCollection.find().toArray();
  const credentials = encryptedCredentials.map((credential) =>
    decryptCredential(credential, key)
  );
  return credentials;
}

export async function findCredential(
  name: string
): Promise<Credential | undefined> {
  const credentialCollection = getCredentialCollection();
  const service = await credentialCollection.findOne({ service: name });
  return service;
}

export async function delCredential(name: string): Promise<void> {
  const credentialCollection = getCredentialCollection();
  await credentialCollection.deleteOne({ service: name });
}
