import { OrderCancelledEvent, Publisher, Subjects } from '@jfticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
