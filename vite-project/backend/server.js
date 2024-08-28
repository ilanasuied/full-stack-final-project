import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import userRoutes from './routes/userRoutes.js'; 
import postRoutes from './routes/postRoutes.js'; 
import messageRoutes from './routes/MessageRoutes.js';
import likeRoutes from './routes/LikeRoutes.js';
import commentRoutes from './routes/CommentRoutes.js';
import scoreRoutes from './routes/scoreRoutes.js'

const app = express();
const port = process.env.PORT || 3001;
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', messageRoutes);
app.use('/api', likeRoutes);
app.use('/api', commentRoutes);
app.use('/api', scoreRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 