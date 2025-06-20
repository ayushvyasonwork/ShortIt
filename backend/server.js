import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from './config/dbConnect.js'
dotenv.config()
import shortenRoutes from './routes/shortenRoutes.js'
import redirectRoutes from './routes/redirectRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'
import tagRoutes from './routes/tagRoutes.js'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
}));
app.use('/api', shortenRoutes);
app.use('/', redirectRoutes);
app.use('/api', analyticsRoutes);
app.use('/api', tagRoutes);
app.use('/api', authRoutes);
connectDB();
app.get('/', (req, res) => {
  res.send('Welcome to the URL Shortener API')
});
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})