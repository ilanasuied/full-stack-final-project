import express from 'express';
import {createComment, deleteComment} from '../controllers/commentController.js';

const router = express.Router();


// Router for create a new comment
router.post('/comment', createComment);

// Router for delete a comment
router.delete('/comment/:comment_id', deleteComment);

export default router;