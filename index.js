import express from 'express';
import mongoose from 'mongoose';
import user from './routes/user.js';
import auth from './routes/auth.js';
import authMiddleware from './middlewares/authMiddleware.js';
import helmet from 'helmet';
import errorHandler from './middlewares/errorHandlerMiddleware.js';

const app = express();
const dbConnection = async () => {
    try {
	const connect = await mongoose.connect(process.env.DB_URL);
	console.log(`Connected to ${connect.connection.name} database`);
    } catch(error) {
	console.error(error);
	throw new Error("Couldn't connect to database");
    }
}

dbConnection();

app.use(express.json());

app.use(helmet());
app.disable("x-powered-by");

app.use("/api/auth", auth);
app.use("/api/user", authMiddleware, user);

app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

