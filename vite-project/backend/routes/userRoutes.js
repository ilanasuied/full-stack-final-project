import express from 'express';
import { getAllUsers, getUserById, getUserByUsername, updateUser, deleteUser, handleUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/users',getAllUsers);

router.get('/users/:id',getUserById);

router.get('/users/username/:username', getUserByUsername)

router.post('/users', handleUser);

router.put('/users/:id',  updateUser);

router.delete('/users/:id', deleteUser);




export default router;
