import express from "express";
import morgan from 'morgan';

const app = express()

app.use(express.json());
app.use(express.urlencoded( { extended: false }));
app.use(morgan('dev'));

app.listen(3000, () => {
    console.log('Server on port 3000');
})