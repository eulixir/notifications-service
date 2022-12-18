import { Notification } from '@app/entities/notification';
import { Content } from '@app/entities/content';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memmory-notifications-repositoy';
import { CountRecipientNotification } from './count-recipient-notification';
import { makeNotification } from '@test/factories/notification-facotry';

describe('Cancel notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipientId-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipientId-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipientId-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipientId-1',
    });

    expect(count).toEqual(2);
  });
});
