import express from 'express';
import {createLike, deleteLike} from '../controllers/likeController.js';

const router = express.Router();


// Route pour créer un nouveau like
router.post('/like', createLike);

// Route pour effacer un like
router.delete('/like/:user_id/:post_id', deleteLike);



export default router;
