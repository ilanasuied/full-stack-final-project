import { createConnection } from '../db.js';


//function to create a new comment
export const createComment = async (req, res) => {
    const { user_id, post_id, content } = req.body;

    try {
      const connection = await createConnection();
      const [result] = await connection.query(`
          INSERT INTO comments (user_id, post_id, content)
          VALUES (${user_id}, ${post_id}, '${content}');
        `);
  
        const [comments] = await connection.query(`
            SELECT Comments.content, Comments.comment_id, Comments.user_id, Users.username AS commenter
            FROM Comments
            JOIN Users ON Comments.user_id = Users.user_id
            WHERE Comments.post_id = ${post_id} AND Comments.comment_id = ${result.insertId};
          `);
      await connection.end();
  
      res.status(201).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


//delete a comment
export const deleteComment = async (req, res) => {  
  const comment_id = req.params.comment_id;
  
  try {
    const connection = await createConnection();

    await connection.query(`
      DELETE FROM comments 
      WHERE comment_id = ${comment_id};
      `);


    res.status(204).end();
    
    await connection.end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
};