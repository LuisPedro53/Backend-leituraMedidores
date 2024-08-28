import express from 'express';
import { connectDB } from './database';

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
