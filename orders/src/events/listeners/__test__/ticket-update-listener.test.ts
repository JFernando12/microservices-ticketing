import { TicketUpdatedEvent } from '@jfticketing/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketUpdatedListener } from '../ticket-updated-listener';

const setup = async () => {
  // Create and save a fake ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'ticket prueba',
    price: 10,
  });
  await ticket.save();

  // Create an instance of listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // Create a fake data to update
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'ticker prueba 2',
    price: 20,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // Create a fake msg.ack
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { ticket, listener, data, msg };
};

it('Find, update and save a ticket', async () => {
  const { ticket, listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const ticketUpdated = await Ticket.findById(ticket.id);

  expect(ticketUpdated?.id).toEqual(data.id);
  expect(ticketUpdated?.title).toEqual(data.title);
  expect(ticketUpdated?.price).toEqual(data.price);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toBeCalled();
});

it('Does not call ack if the event has a skipped version number', async () => {
  const { listener, data, msg } = await setup();

  // Change to incorrect version
  data.version = 10;

  // Implement try catch to avoid innecessary errors in test
  try {
    await listener.onMessage(data, msg);
  } catch (e) {}
  expect(msg.ack).not.toBeCalled();
});
