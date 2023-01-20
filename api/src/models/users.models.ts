import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

//creando una interface de TS que representa un documento en mongoDB
interface IUsers {
	email: string;
	userName: string;
	password: string; 
};

//creando un Schema que corresponde a la interface creada para el documento
const userSchema = new Schema<IUsers>({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	userName: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		unique: true
	}
});

//encriptando la contraseña del nuevo usuario
userSchema.pre<IUsers>('save', async (next):Promise<any> => {
	if(this.isModified('password')){
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(this.password, salt);
		this.password = hash;
		next();
	} else {
		next();
	}
});

//comprobar o buscar contraseña guardada
userSchema.methods.comparatePassword = async(password: string): Promise<boolean> => {
	return await bcrypt.compare(password, this.password);
};

//creaando el modelo
export default model<IUsers>('Users', userSchema);