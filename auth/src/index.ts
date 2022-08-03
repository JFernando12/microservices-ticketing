import express from "express";
import morgan from 'morgan';
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentuserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express()

app.use(express.json());
app.use(express.urlencoded( { extended: false }));
app.use(morgan('dev'));

app.use('/api', currentuserRouter);
app.use('/api', signinRouter);
app.use('/api', signoutRouter);
app.use('/api', signupRouter);

app.all('*', async() => {
    throw new NotFoundError();
})

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server on port 3000');
})