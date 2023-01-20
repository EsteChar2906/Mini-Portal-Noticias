import express from 'express';
import { user } from '../controllers/user.controllers';
const router = express.Router();

router.post('/signup', user.signUp);
router.post('/signin', user.signIn);

export default router;