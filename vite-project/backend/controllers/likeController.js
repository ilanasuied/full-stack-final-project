import { createConnection } from '../db.js';

export const createLike = async (req, res) => {
    const { user_id, post_id, comment_id } = req.body;
    console.log(`${user_id}, ${post_id} , ${comment_id}`);
    try {
      const connection = await createConnection();
      const [result] = await connection.query(`
          INSERT INTO likes (user_id, post_id, comment_id)
          VALUES (${user_id}, ${post_id}, ${comment_id});
        `);
  
      await connection.end();
  
      res.status(201).json({ like: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


export const deleteLike = async (req, res) => {  
    const user_id = req.params.user_id;
    const post_id = req.params.post_id;
    
    console.log(`${user_id}, ${post_id}`);
    try {
      const connection = await createConnection();
  
      await connection.query(`
        DELETE FROM likes 
        WHERE user_id = ${user_id} AND post_id = ${post_id};
        `);
  
  
      res.status(204).end();
      
      await connection.end();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' }); 
    }
  };
  