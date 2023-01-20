import { Schema, Types, model } from 'mongoose';

//creando interface TS
interface INoticias {
	autor: string;
	title: string;
	description: string;
	user: Types.ObjectId;
};

//creando schema
const noticiaSchema = new Schema<INoticias>({
	autor: {
		type: String,
		required: true,
		trim: true
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users'
	}
});

//creando modelo
export default model<INoticias>('Noticias', noticiaSchema);