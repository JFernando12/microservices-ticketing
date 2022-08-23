import express from "express";
import "express-async-errors";
import morgan from 'morgan';
import cookieSession from "cookie-session";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentuserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";


const app = express()
app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded( { extended: false }));
app.use(morgan('dev'));
app.use(cookieSession({
    signed: false,
    secure: true
}))

app.use('/api/users', currentuserRouter);
app.use('/api/users', signinRouter);
app.use('/api/users', signoutRouter);
app.use('/api/users', signupRouter);

app.all('*', async(req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app };