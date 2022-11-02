import { Listener, OrderCreatedEvent, Subjects } from '@jfticketing/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';
import { TicketUpdatedPublisher } from '../publishers/ticket-update-publisher';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error('Ticket not found!');
    }

    // Set orderId means that ticket has been reserved
    ticket.set({ orderId: data.id });
    ticket.save();

    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: '',
      version: 0,
      title: '',
      price: 0,
      userId: '',
    });
  }
}
