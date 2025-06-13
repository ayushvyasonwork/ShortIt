import express from 'express';
const router = express.Router();
import { authMiddleware } from "../middleware/auth.js";
import {createShortUrl} from '../controllers/shortenController.js';
import {validateShortCode} from '../middleware/validateShortCode.js';
router.post('/shorten',authMiddleware, validateShortCode, createShortUrl);

export default router;