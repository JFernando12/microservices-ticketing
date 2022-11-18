import mongoose from 'mongoose';
import { app } from './app';

if (!process.env.JWT_KEY) {
  throw new Error('jwt_key must exist');
}

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI must exit');
}

console.log('Starting auth....');

mongoose
  .connect(process.env.MONGO_URI)
  .then((db) => console.log('DB connected:', db.connections[0].name))
  .catch((err) => console.error(err));

app.listen(3000, () => {
  console.log('Server on port 3000');
});
