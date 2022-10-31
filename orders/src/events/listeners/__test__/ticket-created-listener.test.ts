import { TicketCreatedEvent } from '@jfticketing/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketCreatedListener } from '../ticket-created-listener';

const setup = () => {
  // Create a instance of listener
  const listener = new TicketCreatedListener(natsWrapper.client);

  // Create a data fake
  const data: TicketCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: 'ticker prueba',
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // Create a msg.ack fake
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('Create a save and save a ticket', async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg);

  const ticket = await Ticket.findById(data.id);

  expect(ticket!.id).toEqual(data.id);
  expect(ticket?.title).toEqual(data.title);
  expect(ticket?.price).toEqual(data.price);
});

it('acks the message', async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toBeCalled();
});
