import mongoose from 'mongoose';
import { app } from './app';

if (!process.env.JWT_KEY) {
  throw new Error('jwt_key must exist');
}

mongoose
  .connect('mongodb://auth-mongo-srv:27017/auth')
  .then((db) => console.log('DB connected'))
  .catch((err) => console.error(err));

app.listen(3000, () => {
  console.log('Server on port 3000');
});
