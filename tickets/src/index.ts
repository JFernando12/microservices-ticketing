import mongoose from 'mongoose';
import { app } from './app';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { natsWrapper } from './nats-wrapper';

if (!process.env.JWT_KEY) {
  throw new Error('jwt_key must exist');
}

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI must exist');
}

if (!process.env.NATS_CLIENT_ID) {
  throw new Error('NATS_CLIENT_ID must exist');
}

if (!process.env.NATS_URL) {
  throw new Error('NATS_URL must exist');
}

if (!process.env.NATS_CLUSTER_ID) {
  throw new Error('NATS_CLUSTER_ID must exist');
}

mongoose
  .connect(process.env.MONGO_URI)
  .then((db) => console.log('DB connected:', db.connections[0].name))
  .catch((err) => console.error(err));

natsWrapper
  .connect(
    process.env.NATS_CLUSTER_ID,
    process.env.NATS_CLIENT_ID,
    process.env.NATS_URL
  )
  .then(() => {
    new OrderCreatedListener(natsWrapper.client);
    new OrderCancelledListener(natsWrapper.client);
  })
  .catch((err) => console.error(err));

natsWrapper.client.on('close', () => {
  console.log('NATS connection closed!');
  process.exit();
});
process.on('SIGINT', () => natsWrapper.client.close());
process.on('SIGTERM', () => natsWrapper.client.close());

app.listen(3000, () => {
  console.log('Server on port 3000');
});
