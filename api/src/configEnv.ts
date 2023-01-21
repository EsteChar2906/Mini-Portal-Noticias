import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;

//base de datos
export const USER_DB = process.env.USER_DB;
export const PASSWORD_DB = process.env.PASSWORD_DB;
export const HOST_DB = process.env.HOST_DB;
export const NAME_DB = process.env.NAME_DB;
export const URL_DB = process.env.URL_DB || `mongodb+srv://${USER_DB}:${PASSWORD_DB}@${HOST_DB}/${NAME_DB}`;

//jwt
export const jwtSecret = 'claveclimanoticia';