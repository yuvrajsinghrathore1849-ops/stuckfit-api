import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

const __dirname = path.resolve();
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

// Fallback to local MongoDB if no URI is provided in .env
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/stuckfit';

/*
mongoose.connect(MONGO_URI)
  .then(() => console.log(`MongoDB Connected: ${MONGO_URI}`))
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    console.log('Ensure MongoDB is running locally or provide a valid MONGO_URI.');
  });
*/

app.get('/', (req, res) => {
  res.send('Stuckfit API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(400).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
