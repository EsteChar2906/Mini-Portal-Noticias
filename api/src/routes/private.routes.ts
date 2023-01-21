import { Router } from 'express';
import passport from 'passport';
const router = Router();

router.get("/private", passport.authenticate('jwt', {session: false}), (req, res) => {
	res.send('succes')
});

export default router;