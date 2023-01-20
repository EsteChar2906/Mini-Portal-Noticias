import mongoose from 'mongoose';
import { URL_DB } from './configEnv';

const connectDB = async() => {
	await mongoose.set('strictQuery', false);
	const db = await mongoose.connect(URL_DB);
	console.log(`Database in port ${db.connection.port}`);
} 

connectDB();
