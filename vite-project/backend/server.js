import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import userRoutes from './routes/userRoutes.js'; 
import postRoutes from './routes/postRoutes.js'; 
import messageRoutes from './routes/MessageRoutes.js';

const app = express();
const port = process.env.PORT || 3001;
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', messageRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 