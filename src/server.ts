import 'reflect-metadata';
import express, { json } from 'express';
import routes from './routes';

import './database';

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`⚡ Server running on port ${PORT}`);
});
