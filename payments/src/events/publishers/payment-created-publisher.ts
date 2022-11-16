import { PaymentCreatedEvent, Publisher, Subjects } from '@jfticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
