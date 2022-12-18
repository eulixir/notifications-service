import { InMemoryNotificationsRepository } from '@test/repositories/in-memmory-notifications-repositoy';
import { makeNotification } from '@test/factories/notification-facotry';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get notification', () => {
  it('should be able to return recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const recipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await recipientNotifications.execute({
      recipientId: 'recipientId-1',
    });

    expect(notifications.length == 2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipientId-1' }),
        expect.objectContaining({ recipientId: 'recipientId-1' }),
      ]),
    );
  });
});
