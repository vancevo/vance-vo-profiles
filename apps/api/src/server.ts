import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ProjectSchema, ApiResponse } from '@workspace/shared';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// TODO: Create dedicated routes and models
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
