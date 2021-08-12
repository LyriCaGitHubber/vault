import express, { response } from 'express';
import {
  addCredential,
  deleteCredential,
  getCredential,
  readCredentials,
  updateCredential,
} from './utils/credentials';

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
  try {
    const credential = await getCredential(service);
    response.status(200).json(credential);
  } catch (error) {
    console.error(error);
    response.status(404).send(`Could not find service: ${service}`);
  }
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.post('/api/credentials', async (req, res) => {
  try {
    await addCredential(req.body);
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).send('Cannot find credentials');
  }
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
