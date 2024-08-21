import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser,handleUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users',getAllUsers);

router.get('/users/:id',getUserById);

router.post('/users', handleUser);

router.put('/users/:id',  updateUser);

router.delete('/users/:id', deleteUser);



export default router;
