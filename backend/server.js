// server.js
import express from 'express';
import connectDB from './config/database.js';
import noteRoutes from './routes/noteRoutes.js';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json())
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});