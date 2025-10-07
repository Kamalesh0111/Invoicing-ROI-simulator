import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './api.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Invoice ROI Genie API is running successfully! 🚀' });
});
app.listen(PORT, () => {
  console.log(`Server is live and listening on http://localhost:${PORT}`);
});
