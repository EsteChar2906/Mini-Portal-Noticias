import {Request, Response} from 'express';
import Users, { IUsers } from '../models/users.models';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../configEnv';

const tokenJWT = (user: IUsers): string => {
	return jwt.sign({id: user.id, email: user.email}, jwtSecret);
};

export const signUp = async(req: Request, res: Response):Promise<any> => {
	try{
		let { email, userName, password } = req.body;
		if(!email || !password){
			return res.status(400).json({message: "Please send your email and password "});
		}

		const userSearch = await Users.findOne({email: email});
		if(userSearch){
			res.status(400).json({message: 'User already exists'});
		}

		const newUser = new Users({
			email,
			userName,
			password: await Users.encryptPassword(password)
		});

		await newUser.save();

		res.status(201).json(newUser);

	} catch(error) { 
		if(error instanceof Error){
			return res.status(500).json({message: error.message});
		}
	}
};

export const signIn = async(req: Request, res: Response):Promise<any> => {
	try{
		let { email, password } = req.body;
		if(!email || !password){
			return res.status(400).json({message: 'Please send your email and password'});
		}

		const findUser = await Users.findOne({email: email});
		if(!findUser){
			return res.status(400).json({message: 'The user does not exists, please sign up'})
		} else {
			const authUser = await Users.comparatePassword(password, findUser.password);
			if(!authUser){
				res.status(400).json({message: 'The email or password are incorrect'})
			}else{
				res.status(200).json({token: tokenJWT(findUser)});
			}
		}
	} catch(error){
		if(error instanceof Error){
			return res.status(500).json({message: error.message});
		}
	}
};