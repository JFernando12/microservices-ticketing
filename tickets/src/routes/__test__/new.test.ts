import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/tickets for post request', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('return status 401 when sign in does not exist', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

it('return a status other than 401 if the user is signed in', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({});

  expect(response.status).not.toEqual(401);
});

it('', async () => {});

it('', async () => {});
