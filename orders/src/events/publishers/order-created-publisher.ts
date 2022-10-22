import { OrderCreatedEvent, Publisher, Subjects } from '@jfticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
