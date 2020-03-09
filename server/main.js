
import express from 'express'
import bodyParser from 'body-parser';
import storyRoute from './routes/story';
import userRoute from './routes/user';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = new express();
const port = 4001;
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.all('/api/', (req, res) => res.status(200).send({
	message: 'Welcome please find your way to the valid endpoints'
}))
app.use('/api/',storyRoute);
app.use('/api/', userRoute)
app.all('*', (req,res)=>res.status(404).send({
	message: 'You are in the wrong location'
}))
app.set('port', port);
app.listen(port, () => console.info(`App running on port: ${port}`) );
export default app;
