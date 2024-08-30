import express from 'express';
import { getAllScores, getScoreById, deleteScore, handleScores } from '../controllers/scoreController.js';


const router = express.Router();

router.get('/scores',getAllScores);

router.get('/scores/:id',getScoreById);

router.post('/scores/:id', handleScores);

router.delete('/scores/:id', deleteScore);

export default router;