import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { jwtSecret } from '../configEnv';
import Users from '../models/users.models';

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtSecret
};

export default new Strategy(options, async (payload, done) => {
	try{
		const user = await Users.findById(payload.id);
		if(!user){
			return done(null, false);
		}else{
			return done(null, user);
		}
	} catch(error){
		if(error instanceof Error){
			console.log(error.message);
		}
	}
});