//getAllScores, getScoreById, deleteUser, handleScores
import { createConnection } from "../db.js";


export const getAllScores = async (req, res) =>{
    try {
        const connection = await createConnection();
        const [scores] = await connection.query(`
            SELECT *
            FROM Scores
          `);
        await connection.end();
        res.status(200).json(scores);
    
    
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

};


export const getScoreById = async (req, res) => {
  const userId = req.params.id; // Récupère l'ID de l'utilisateur depuis les paramètres de la requête

  try {
      const connection = await createConnection();
      
     
      const [scores] = await connection.query(`
          SELECT *
          FROM Scores
          WHERE user_id = ?
      `, [userId]);

      await connection.end();
      res.status(200).json(scores);
  
  } catch (error) {
      res.status(500).json({ error: error.message }); 
  }
};


export const deleteScore = async (req, res) =>{

};
export const handleScores = async (req, res) =>{

};
