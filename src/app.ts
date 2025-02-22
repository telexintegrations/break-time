import express, { Response, Application } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Application = express();

const port = process.env.PORT || '3000';

app.use(express.json());
app.use(cors());

app.get('/', (_, res: Response) => {
	res.status(StatusCodes.OK).json({
		message: 'Welcome to this site!',
	});
});

app.listen(port, () =>
	console.log(`Server running successfully on port: ${port}`)
);
