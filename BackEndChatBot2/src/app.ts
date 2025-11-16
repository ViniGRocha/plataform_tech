import express from 'express';
import cors from 'cors';
import { routerChatBot } from './router';

export const app = express();

app.use(cors());
app.use(express.json());

// rota oficial:
app.use('/api/chat', routerChatBot);
