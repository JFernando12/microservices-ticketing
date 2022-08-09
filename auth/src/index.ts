import express from "express";
import morgan from 'morgan';
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentuserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

import mongoose from "mongoose";

const app = express()

app.use(express.json());
app.use(express.urlencoded( { extended: false }));
app.use(morgan('dev'));

app.use('/api/users', currentuserRouter);
app.use('/api/users', signinRouter);
app.use('/api/users', signoutRouter);
app.use('/api/users', signupRouter);

app.all('*', async() => {
    throw new NotFoundError();
})

app.use(errorHandler);

mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    .then(db => console.log('DB connected'))
    .catch(err => console.error(err));


app.listen(3000, () => {
    console.log('Server on port 3000');
})