import { createConnection } from '../db.js';
import bcrypt from 'bcrypt';


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




export const getUserById = () => { };
export const updateUser = () => { };
export const deleteUser = () => { };


export const handleUser = async (req, res) => {
  const { username, email, password, role, created_at, action } = req.body;
  console.log(username, email, password, role, created_at, action);

  try {
    const connection = await createConnection();

    // Vérifiez si l'utilisateur existe déjà
    const [users] = await connection.query('SELECT * FROM Users WHERE username = ?', [username]);
    const user = users[0];

    if (action === 'signup') {
      if (user) {
        // Si l'utilisateur existe déjà, renvoyez une erreur pour l'inscription
        return res.status(400).json({ message: 'Username already taken' });
      } else {
        // Créer un nouvel utilisateur
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await connection.query('INSERT INTO Users (username, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)', 
          [username, email, hashedPassword, role, created_at]);

        // Obtenir l'ID généré pour l'utilisateur
        const userId = result.insertId; 
        
        res.status(201).json({ message: 'User created successfully', user: { id: userId, username } });
      }
    } else if (action === 'login') {
      if (user) {
        // Authentifier l'utilisateur existant
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Incorrect username or password' });
        }

        res.status(200).json({ message: 'Login successful', user: { id: user.user_id, username: user.username } });
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


