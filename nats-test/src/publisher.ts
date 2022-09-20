import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  const data = JSON.stringify({
    id: '112',
    title: 'Title 1',
    price: 22,
  });

  stan.publish('ticket:created', data, () => {
    console.log('Ticket has been published');
  });
});
