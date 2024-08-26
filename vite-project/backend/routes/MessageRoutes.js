import express from 'express';
import { getMessagesById, getAllMessages, getConversationId, createConversation, createMessage,} from '../controllers/messageController.js';

const router = express.Router();


// Route pour obtenir tous les messages par ID
router.get('/messages/:id', getMessagesById);

//Route pour obtenir tous les messages
router.get('/messages/all/:id', getAllMessages);

//Route pour obtenir le ID d'une conversation
router.get('/message/conversation/:id/:recipientId',getConversationId);

// Route pour créer une nouvelle conversation
router.post('/conversation', createConversation);

// Route pour créer un nouveau message
router.post('/messages', createMessage);


export default router;
