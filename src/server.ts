import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {
  addCredential,
  deleteCredential,
  getCredential,
  readCredentials,
  updateCredential,
} from './utils/credentials';
import type { Credential } from './types';
import { validateMasterPassword } from './utils/validation';
import { DBConnection } from './utils/database';

if (!process.env.MONGODB_URL) {
  throw new Error('No MONGODB_URL dotenv variable');
}

const app = express();
const port = 3000;
app.use(express.json());

app.get('/api/credentials', async (_req, res) => {
  try {
    const credentials = await readCredentials();
    res.status(200).json(credentials);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal server error.`);
  }
});

app.get('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }
  try {
    const credential = await getCredential(service, masterPassword);
    response.status(200).json(credential);
  } catch (error) {
    console.error(error);
  }
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.post('/api/credentials', async (req, res) => {
  const credential: Credential = req.body;
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!validateMasterPassword(masterPassword)) {
    res.status(401).send('Unauthorized request');
    return;
  }
  await addCredential(credential, masterPassword);
  return res.status(200).send(credential);
});

app.delete('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  try {
    await deleteCredential(service);
    response.status(200).send('Deleted');
  } catch (error) {
    console.error(error);
  }
});

app.put('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  const credential: Credential = request.body;
  try {
    await updateCredential(service, credential);
    response.status(200).json(credential);
  } catch (error) {
    console.error();
    response.status(404).send(`Could not find service ${service}`);
  }
});

DBConnection(process.env.MONGODB_URL).then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}! 🚀`);
  });
});
