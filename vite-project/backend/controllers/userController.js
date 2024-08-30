import { createConnection } from '../db.js';
import bcrypt from 'bcrypt';


export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query; // 5 by page by default
    const offset = (page - 1) * limit;

    const connection = await createConnection();
    
    // Get the total users 
    const [totalResult] = await connection.query(`
      SELECT COUNT(*) as total FROM Users WHERE Users.role <> 'ADMIN';
    `);
    const totalUsers = totalResult[0].total;

    // get the users 
    const [users] = await connection.query(`
      SELECT *
      FROM Users
      WHERE Users.role <> 'ADMIN'
      LIMIT ? OFFSET ?;
    `, [parseInt(limit), parseInt(offset)]);
    
    await connection.end();

    // The data to return
    res.status(200).json({
      totalUsers,
      users
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getUserById = async (req, res) => {

  try {
    const connection = await createConnection();
    const userId = req.params.id;
    const [users] = await connection.query('SELECT u.user_id, u.username, u.email, u.role, u.created_at, p.bio FROM Users u LEFT JOIN profiles p ON u.user_id = p.user_id WHERE u.user_id = ?', [userId]);
    const user = users[0];

    await connection.end();
    res.status(200).json(user);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getUserByUsername = async (req, res) => {
  try {
    const connection = await createConnection();
    const username = req.params.username;
    const [users] = await connection.query('SELECT username, user_id FROM Users WHERE username = ?', [username]);
    const user = users[0];

    await connection.end();


    res.status(200).json(user);




  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateUser = () => {


};


export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const connection = await createConnection();

    // Supprimer les likes associés aux commentaires des posts de cet utilisateur
    await connection.query('DELETE FROM likes WHERE comment_id IN (SELECT comment_id FROM comments WHERE post_id IN (SELECT post_id FROM posts WHERE user_id = ?))', [id]);

    // Supprimer les commentaires associés aux posts de cet utilisateur
    await connection.query('DELETE FROM comments WHERE post_id IN (SELECT post_id FROM posts WHERE user_id = ?)', [id]);

    // Supprimer les posts de cet utilisateur
    await connection.query('DELETE FROM posts WHERE user_id = ?', [id]);

    // Supprimer les profils associés à cet utilisateur
    await connection.query('DELETE FROM profiles WHERE user_id = ?', [id]);

    // Supprimer l'utilisateur
    await connection.query('DELETE FROM users WHERE user_id = ?', [id]);

    res.status(204).end();

    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





export const handleUser = async (req, res) => {
  const { username, email, password, role, created_at, action } = req.body;


  try {
    const connection = await createConnection();
    const [users] = await connection.query('SELECT * FROM Users WHERE username = ?', [username]);
    const user = users[0];

    if (action === 'signup') {
      if (user) {

        return res.status(400).json({ message: 'Username already taken' });
      } else {

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await connection.query('INSERT INTO Users (username, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)',
          [username, email, hashedPassword, role, created_at]);


        const userId = result.insertId;

        res.status(201).json({ message: 'User created successfully', user: { id: userId, username } });
      }
    } else if (action === 'login') {
      if (user) {

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Incorrect username or password' });
        }

        res.status(200).json({
          message: 'Login successful',
          user: {
            id: user.user_id,
            username: user.username,
            role: user.role
          }
        });
      } else {
        return res.status(401).json({ message: 'Incorrect username or password' });
      }
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }

    await connection.end();
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    setMessage('Connection Error');
  }

};



