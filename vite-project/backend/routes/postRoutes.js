import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost} from '../controllers/postController.js';
//import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour obtenir tous les posts
router.get('/posts', getAllPosts);

// Route pour obtenir un post par ID
router.get('/posts/:id', getPostById);

// Route pour créer un nouveau post
router.post('/posts', createPost);//router.post('/posts', authMiddleware, createPost);

// Route pour mettre à jour un post existant
router.put('/posts/:id',updatePost);

// Route pour supprimer un post
router.delete('/posts/:id', deletePost);

export default router;
