//getAllScores, getScoreById, deleteUser, handleScores
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


export const deleteScore = async (req, res) => {

};



export const handleScores = async (req, res) => {
  try {
    const { userId,score } = req.body;
    const connection = await createConnection();
    
    const [result] = await connection.query(
      `INSERT INTO scores (id, score) VALUES (?, ?)`,
      [userId, score]
    );
    
    const newScoreId = result.insertId;

    res.status(201).json({scoreId: newScoreId });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ message: 'Server Error' });
  }
};



