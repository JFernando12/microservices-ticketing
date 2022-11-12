import { Listener, OrderCreatedEvent, Subjects } from '@jfticketing/common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Creating delay
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this milliseconds to process the job', delay);

    // Add job to the queue
    await expirationQueue.add({ orderId: data.id }, { delay });

    // Ack message
    msg.ack();
  }
}
