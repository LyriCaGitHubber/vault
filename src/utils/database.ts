import { Collection, MongoClient } from 'mongodb';
import { Credential } from '../types';

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

export async function createListing(credential: Credential): Promise<void> {
  const credentialCollection = getCredentialCollection();
  credentialCollection.insertOne(credential);
}

export async function findCredential(
  name: string
): Promise<Credential | undefined> {
  const credentialCollection = getCredentialCollection();
  const service = await credentialCollection.findOne({ service: name });
  return service;
}

export async function deleteCredential(name: string): Promise<void> {
  const credentialCollection = getCredentialCollection();
  await credentialCollection.deleteOne({ service: name });
}
