import { Schema, Types, model } from 'mongoose';

//interface TS
interface IClima {
	city: string;
	weather: string;
	description: string;
	icon: string;
	temp: number;
};

//schema
const climaSchema = new Schema<IClima>({
	city: {
		type: String,
		required: true
	},
	weather: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	icon: {
		type: String
	},
	temp: {
		type: Number
	}
});

export default model<IClima>('Clima', climaSchema);