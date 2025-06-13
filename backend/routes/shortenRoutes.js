import express from 'express';
const router = express.Router();
import {createShortUrl} from '../controllers/shortenController.js';
import {validateShortCode} from '../middleware/validateShortCode.js';
router.post('/shorten', validateShortCode, createShortUrl);

export default router;