import { Publisher, Subjects, TicketUpdatedEvent } from '@jfticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
