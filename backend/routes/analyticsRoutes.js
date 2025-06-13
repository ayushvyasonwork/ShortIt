import express from 'express';
const router = express.Router();
import {getAnalytics} from '../controllers/analyticsController.js';

// Analytics route: GET /analytics/:code
router.get('/analytics/:code', getAnalytics);

export default router;