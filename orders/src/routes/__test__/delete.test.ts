import { OrderStatus } from '@jfticketing/common';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('Mark an order as cancelled', async () => {
  // Create a ticket
  const ticket = Ticket.build({
    title: 'Ticket de prueba',
    price: 40,
  });
  await ticket.save();

  // Create a user cookie
  const user = global.signin();

  // Create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Cancell order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send({})
    .expect(204);

  const orderUpdated = await Order.findById(order.id);
  expect(orderUpdated?.status).toEqual(OrderStatus.Cancelled);
});

it.todo('Emits an order cancelled event');
