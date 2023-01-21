import {Request, Response} from 'express';
import Users, { IUsers } from '../models/users.models';

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
		} else {
			throw new Error("Error no identificado")
		}
	}
};

export const signIn = async(req: Request, res: Response):Promise<any> => {
	res.send("Login");
};