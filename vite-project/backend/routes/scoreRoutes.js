import express from 'express';
import { getAllScores, getScoreById, handleScores } from '../controllers/scoreController.js';


const router = express.Router();

router.get('/scores',getAllScores);

router.get('/scores/:id',getScoreById);

router.post('/scores/:id', handleScores);


export default router;