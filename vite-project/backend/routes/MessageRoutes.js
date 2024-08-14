import express from 'express';
import { getMessagesById, createMessage} from '../controllers/messageController.js';

const router = express.Router();


// Route pour obtenir tous les messages par ID
router.get('/messages/:id', getMessagesById);

// Route pour créer un nouveau message
router.post('/messages', createMessage);


export default router;
