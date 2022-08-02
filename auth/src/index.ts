import express from "express";
import morgan from 'morgan';
import { errorHandler } from "./middlewares/error-handler";
import { currentuserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express()

app.use(express.json());
app.use(express.urlencoded( { extended: false }));
app.use(morgan('dev'));

app.use('/api/users', currentuserRouter);
app.use('/api/users', signinRouter);
app.use('/api/users', signoutRouter);
app.use('/api/users', signupRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server on port 3000');
})