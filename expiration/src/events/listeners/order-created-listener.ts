import { Listener, OrderCreatedEvent, Subjects } from '@jfticketing/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Set orderId means that ticket has been reserved

    // Ack message
    msg.ack();
  }
}
