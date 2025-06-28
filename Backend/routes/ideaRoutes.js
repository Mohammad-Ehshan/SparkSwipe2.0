import express from 'express';
import { generateIdeas } from '../controllers/ideaController.js';

const router = express.Router();
router.post('/generate', generateIdeas); 

export default router;