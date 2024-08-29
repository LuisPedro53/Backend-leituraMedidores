import express from 'express';
import { connectDB } from './database';
import geminiRoutes from './routes/upload';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
dotenv.config();

app.get('/', async (req, res) => {
  res.send('Hello, World!');
});

app.use('/image', geminiRoutes);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
