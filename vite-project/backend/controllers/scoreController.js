
import { createConnection } from "../db.js";


export const getAllScores = async (req, res) => {
  try {
    const connection = await createConnection();
    const [scores] = await connection.query(`
      SELECT u.username, s.score, s.date
      FROM scores s
      LEFT JOIN users u
      ON s.user_id = u.user_id
      ORDER BY s.score DESC
  `);
    await connection.end();
    res.status(200).json(scores);


  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


export const getScoreById = async (req, res) => {
  const userId = req.params.id;

  try {
    const connection = await createConnection();


    const [scores] = await connection.query(`
        SELECT u.username, s.score, s.date
        FROM scores s
        LEFT JOIN users u
        ON s.user_id = u.user_id
        WHERE u.user_id = ?
        ORDER BY s.score DESC  
        
      `, [userId]);

    await connection.end();
    res.status(200).json(scores);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const handleScores = async (req, res) => {
  console.log('Received POST request');
  console.log('Request body:', req.body);

  try {
    const { userId, score } = req.body;
    console.log('User ID:', userId);
    console.log('Score:', score);

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

 
    const connection = await createConnection();

    
    const [result] = await connection.query(
      `INSERT INTO scores (user_id, score) VALUES (?, ?)`,
      [userId, score]
    );
    const newScoreId = result.insertId;

    
    await connection.end();

    
    res.status(201).json({ scoreId: newScoreId });
  } catch (error) {
    console.error('Error handling scores:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

