import { createConnection } from '../db.js';

export const getAllUsers = async (req, res) => {
    try {
      const connection = await createConnection();
      const [users] = await connection.query(`
        SELECT Users.username, Users.email, Profiles.bio, Profiles.profile_pic
        FROM Users
        JOIN Profiles ON Users.user_id = Profiles.user_id
      `);
      await connection.end();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const getUserById=()=>{};
export const createUser=()=>{};
export const updateUser=()=>{};
export const deleteUser=()=>{};


