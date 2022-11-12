import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@jfticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
