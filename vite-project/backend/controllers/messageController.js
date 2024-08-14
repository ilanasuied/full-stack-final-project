import { createConnection } from '../db.js';

export const getMessagesById = async (req, res) => {
    try {
        const connection = await createConnection();
    
        // הודעות שנשלחו על ידי המנהל
        const [sentMessages] = await connection.query(`
          SELECT Messages.message_id, Messages.content, Messages.created_at, Users.username AS recipient_username
          FROM Messages
          JOIN Users ON Messages.recipient_id = Users.user_id
          WHERE Messages.sender_id = (
              SELECT user_id FROM Users WHERE role = 'Admin'
          );
        `);
    
        // הודעות שהתקבלו אצל המנהל
        const [receivedMessages] = await connection.query(`
          SELECT Messages.message_id, Messages.content, Messages.created_at, Users.username AS sender_username
          FROM Messages
          JOIN Users ON Messages.sender_id = Users.user_id
          WHERE Messages.recipient_id = (
              SELECT user_id FROM Users WHERE role = 'Admin'
          );
        `);
    
        await connection.end();
    
        res.json({
          sentMessages,
          receivedMessages
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

export const createMessage=()=>{};


