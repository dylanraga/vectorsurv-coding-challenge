import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser';

import movieRouter from './api/movie';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', movieRouter);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
