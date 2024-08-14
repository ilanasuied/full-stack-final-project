import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import { createConnection } from './db.js';

const app = express();
const port = process.env.PORT || 3001;
app.use(cors(corsOptions));

app.get('/users', async (req, res) => {
  try {
    const connection = await createConnection();
    const [users] = await connection.query(`
      SELECT Users.username, Users.email, Profiles.bio, Profiles.profile_pic
      FROM Users
      JOIN Profiles ON Users.user_id = Profiles.user_id
    `);
    await connection.end();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const connection = await createConnection();
    const [posts] = await connection.query(`
      SELECT Posts.post_id, Posts.title, Posts.content, Users.username AS author
      FROM Posts
      JOIN Users ON Posts.user_id = Users.user_id
    `);

    const postPromises = posts.map(async (post) => {
      const [comments] = await connection.query(`
        SELECT Comments.content, Users.username AS commenter
        FROM Comments
        JOIN Users ON Comments.user_id = Users.user_id
        WHERE Comments.post_id = ?
      `, [post.post_id]);

      const [likes] = await connection.query(`
        SELECT Users.username AS liker
        FROM Likes
        JOIN Users ON Likes.user_id = Users.user_id
        WHERE Likes.post_id = ?
      `, [post.post_id]);

      return {
        ...post,
        comments,
        likes: likes.map(like => like.liker)
      };
    });

    const detailedPosts = await Promise.all(postPromises);
    await connection.end();
    res.json(detailedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
