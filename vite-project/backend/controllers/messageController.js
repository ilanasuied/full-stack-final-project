import { createConnection } from '../db.js';

//get all the users that have started a conversation with the current user
export const getAllMessages = async (req, res) => {
  const currentUserId = req.params.id;
  try {
    const connection = await createConnection();
    const [startedConversation] = await connection.query(`
      SELECT DISTINCT Users.username, Users.user_id, Messages.conversation_id
      FROM Messages
      JOIN Users ON (Messages.sender_id = Users.user_id OR Messages.recipient_id = Users.user_id)
      WHERE (Messages.sender_id = ${currentUserId} OR Messages.recipient_id = ${currentUserId})
      AND Users.user_id != ${currentUserId};
      `)

    await connection.end();
    res.json(startedConversation);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//get all the messages from the conversation ID
export const getMessagesById = async (req, res) => {
  try {
    const connection = await createConnection();
    const conversationId = req.params.id;
    const [sentMessages] = await connection.query(`
          SELECT Messages.message_id, Messages.content, Messages.created_at, Messages.sender_id
          FROM Messages
          WHERE conversation_id = ${conversationId};
        `);

    await connection.end();

    res.json(sentMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//get the conversaton id 
export const getConversationId = async (req, res) => {
  const currentUserId = req.params.id;
  const recipientId = req.params.recipientId;

  try {
    const connection = await createConnection();
    const [conversationId] = await connection.query(`
      SELECT distinct conversation_id 
      FROM messages 
      WHERE sender_id = ${currentUserId} AND recipient_id = ${recipientId} OR sender_id = ${recipientId} AND recipient_id = ${currentUserId};
    `);

    await connection.end();

    res.json(conversationId);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


//create a new conversation
export const createConversation = async (req, res) => {
  const recipient_id = req.body.recipient_id;
  try {
    const connection = await createConnection();
    const [result] = await connection.query(`
        INSERT INTO conversations (created_at)
        VALUES
        (DEFAULT);
      `);

    const [details] = await connection.query(`
        SELECT username 
        FROM users
        WHERE user_id = ${recipient_id};
      `);

    await connection.end();
    res.status(201).json({conversation_id: result.insertId,  username: details[0].username});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createMessage = async (req, res) => {
  const { content, sender_id, conversation_id, recipient_id } = req.body;
  try {
    const connection = await createConnection();
    const [result] = await connection.query(`
        INSERT INTO Messages (conversation_id, sender_id, recipient_id, content)
        VALUES (${conversation_id}, ${sender_id}, ${recipient_id}, '${content}');
      `);

    await connection.end();

    res.status(201).json({ message_id: result.insertId, content, sender_id, conversation_id, created_at: new Date() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


