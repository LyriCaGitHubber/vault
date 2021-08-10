import express from 'express';
import { readCredentials } from './utils/credentials';

const app = express();
const port = 3000;

app.get('/api/credentials', async (_req, res) => {
  res.status(200).send(await readCredentials());
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
