import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('New message from admin'),
    category: 'social',
    recipientId: 'example-recipient-id',
    ...override,
  });
}
