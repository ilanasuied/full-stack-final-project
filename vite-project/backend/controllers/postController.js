import { createConnection } from '../db.js';

export const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const connection = await createConnection();
    const [posts] = await connection.query(`
      SELECT Posts.post_id, Posts.title, Posts.content, Users.username AS author
      FROM Posts
      JOIN Users ON Posts.user_id = Users.user_id
      LIMIT ? OFFSET ?
    `, [parseInt(limit), parseInt(offset)]);



    const postPromises = posts.map(async (post) => {
      const [comments] = await connection.query(`
        SELECT Comments.content, Comments.comment_id, Comments.user_id, Users.username AS commenter
        FROM Comments
        JOIN Users ON Comments.user_id = Users.user_id
        WHERE Comments.post_id = ?
      `, [post.post_id]);

      const [likes] = await connection.query(`
        SELECT Users.user_id AS liker
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
};

export const getPostById = async (req, res) => {
  try {
    const user_id = req.params.id;
    const connection = await createConnection();
    const [posts] = await connection.query(`
      SELECT Posts.post_id, Posts.title, Posts.content, Users.username AS author
      FROM Posts
      JOIN Users ON Posts.user_id = Users.user_id
      WHERE Posts.user_id = ?
    `, [user_id]);

    const postPromises = posts.map(async (post) => {
      const [comments] = await connection.query(`
        SELECT Comments.content, Comments.comment_id, Comments.user_id, Users.username AS commenter
        FROM Comments
        JOIN Users ON Comments.user_id = Users.user_id
        WHERE Comments.post_id = ?
      `, [post.post_id]);

      const [likes] = await connection.query(`
        SELECT Users.user_id AS liker
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
};


//create a new post
export const createPost = async (req, res) => {
  try {
    const { user_id, title, content } = req.body;

    const connection = await createConnection();

    // insert the new post
    const [result] = await connection.query(`
      INSERT INTO posts (user_id, title, content)
      VALUES (${user_id}, '${title}', '${content}');
    `);

    const newPostId = result.insertId;

    // Retrieve the details of the newly created post
    const [post] = await connection.query(`
      SELECT Posts.post_id, Posts.title, Posts.content, Users.username AS author
      FROM Posts
      JOIN Users ON Posts.user_id = Users.user_id
      WHERE Posts.post_id = ${newPostId};
    `);

    // Initialize comments and likes to empty tables
    const detailedPost = {
      ...post[0],
      comments: [],
      likes: []
    };

    await connection.end();

    res.status(201).json(detailedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async() => { };

//fonction to delete a post
export const deletePost = async(req, res) => { 
  try {
    const post_id = req.params.id;

    const connection = await createConnection();

    await connection.query(`
      DELETE FROM posts 
      WHERE post_id = ${post_id};
      `);


    res.status(204).end();
    
    await connection.end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
};

