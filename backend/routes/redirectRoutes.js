import express from 'express';
const router = express.Router();
import  {handleRedirect} from '../controllers/redirectController.js';

// Redirection route: GET /:code
router.get('/:code', handleRedirect);
export default router;