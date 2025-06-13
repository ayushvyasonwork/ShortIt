import express from 'express';
const router = express.Router();
import {getUrlsByTag} from '../controllers/tagController.js';


// Tag route: GET /tags/:tag
router.get('/tags/:tag', getUrlsByTag);

export default router;