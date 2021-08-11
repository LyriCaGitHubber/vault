import express, { response } from 'express';
import { getCredential, readCredentials } from './utils/credentials';

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
