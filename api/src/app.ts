import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './configEnv';
//initializations
const app = express();

//settings
app.set("port", PORT);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//routes
app.get("/", (req, res) => {
	res.send(`conectado a localhos en el puerto: ${app.get('port')}`)
})

export default app;
