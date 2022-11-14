import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@jfticketing/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      userId: data.userId,
      version: data.version,
      price: data.ticket.price,
      status: OrderStatus.Created,
    });
    await order.save();

    msg.ack();
  }
}
