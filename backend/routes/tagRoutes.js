import express from 'express';
const router = express.Router();
import {getUrlsByTag} from '../controllers/tagController.js';
import { authMiddleware } from "../middleware/auth.js";

// Tag route: GET /tags/:tag
router.get('/tags/:tag', authMiddleware,getUrlsByTag);

export default router;