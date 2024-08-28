import { createConnection } from '../db.js';

export const createComment = async (req, res) => {
    const { user_id, post_id, content } = req.body;

    try {
      const connection = await createConnection();
      const [result] = await connection.query(`
          INSERT INTO comments (user_id, post_id, content)
          VALUES (${user_id}, ${post_id}, '${content}');
        `);
  
        const [comments] = await connection.query(`
            SELECT Comments.content, Users.username AS commenter
            FROM Comments
            JOIN Users ON Comments.user_id = Users.user_id
            WHERE Comments.post_id = ?
          `, [post_id]);
      await connection.end();
  
      res.status(201).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};