import app from './app';
import './db';

app.listen(app.get('port'), () => {
	console.log(`listening in port ${app.get('port')}`);
});