import { Collection, MongoClient } from 'mongodb';

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
