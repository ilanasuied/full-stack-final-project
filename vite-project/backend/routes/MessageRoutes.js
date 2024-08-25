import express from 'express';
import { getMessagesById, getAllMessages, createMessage,} from '../controllers/messageController.js';

const router = express.Router();


// Route pour obtenir tous les messages par ID
router.get('/messages/:id', getMessagesById);

//Route pour obtenir tous les messages
router.get('/messages/all/:id', getAllMessages)

// Route pour créer un nouveau message
router.post('/messages', createMessage);


export default router;
