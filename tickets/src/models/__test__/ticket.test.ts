import { Ticket } from '../ticket';

it('implements optimist concurrency control', async () => {
  // Create an instance of the Ticket
  const ticket = Ticket.build({
    title: 'Ticker prueba',
    price: 10,
    userId: 'userid',
  });

  // Save the ticket on database
  await ticket.save();

  // Fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // Make two separated changes to the tickets we fetched
  firstInstance?.set({ price: 20 });
  secondInstance?.set({ price: 30 });

  // Save the first ticket fetched
  await firstInstance!.save();

  // Save the second ticket fetched and expect an error
  try {
    await secondInstance?.save();
  } catch (error) {
    return;
  }

  throw new Error('Something went wrong');
});

it('Increments the version number of multiples saves', async () => {
  const ticket = Ticket.build({
    title: 'Ticket prueba',
    price: 10,
    userId: 'asdf',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
