import express from 'express';
import {createComment} from '../controllers/commentController.js';

const router = express.Router();


// Router for create a new comment
router.post('/comment', createComment);


export default router;