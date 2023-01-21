import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './configEnv';
import authRoute from './routes/auth.routes';
import privateRoute from './routes/private.routes';
import passport from 'passport';
import passportMiddleware from './middlewares/passport'
//initializations
const app = express();

//settings
app.set("port", PORT);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);


//routes
app.get("/", (req, res) => {
	res.send(`conectado a localhos en el puerto: ${app.get('port')}`)
});
app.use("/api", authRoute);
app.use("/api", privateRoute);

export default app;
