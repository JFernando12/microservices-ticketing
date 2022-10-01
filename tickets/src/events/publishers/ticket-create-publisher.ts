import { Publisher, Subjects, TicketCreatedEvent } from '@jfticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
