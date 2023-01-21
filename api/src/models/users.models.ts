import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

//creando una interface de TS que representa un documento en mongoDB
export interface IUsers {
	email: string;
	userName: string;
	password: string;
};

//creando interface para los metodos estaticos que encryptan la contraseña
interface IUserModel extends Model<IUsers> {
	encryptPassword(password: string): Promise<string>;
	comparatePassword(password: string, receivedPassword: string): Promise<boolean>;
}

//creando un Schema que corresponde a la interface creada para el documento
const userSchema = new Schema<IUsers, IUserModel>({
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
userSchema.static('encryptPassword', async(password: string) => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
});

//comprobar o buscar contraseña guardada
userSchema.static('comparatePassword', async(password: string, receivedPassword: string) => {
	return await bcrypt.compare(password, receivedPassword);
});

//creaando el modelo
export default model<IUsers, IUserModel>('Users', userSchema);