import express from 'express';
const router = express.Router();
import { authMiddleware } from "../middleware/auth.js";
import {getAnalytics,getAllAnalytics} from '../controllers/analyticsController.js';

// Analytics route: GET /analytics/:code
router.post('/analytics/:code', authMiddleware,getAnalytics);
router.get('/analytics', authMiddleware,getAllAnalytics);

export default router;