import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'ticket prueba',
    price: 20,
  });
  await ticket.save();
  return ticket;
};

it('fetches orders for an particular user', async () => {
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const user1 = global.signin();
  const user2 = global.signin();

  // Create one orders as User 1
  await request(app)
    .post('/api/orders')
    .set('Cookie', user1)
    .send({ ticketId: ticket1.id });

  // Create two orders as User 2
  await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket2.id });
  await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket3.id });

  // Make sure we only got the orders for User 2
  const { body } = await request(app)
    .get('/api/orders')
    .set('Cookie', user2)
    .send({});

  expect(body.length).toEqual(2);
});
