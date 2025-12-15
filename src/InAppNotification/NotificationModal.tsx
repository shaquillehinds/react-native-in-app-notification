import { ModalWrapper } from '@shaquillehinds/react-native-essentials';
import { Notification } from './Notification';
import { type InAppNotificationProps } from './notificationModal.types';
import { useCallback, useState } from 'react';

export function InAppNotification(props: InAppNotificationProps) {
  const { notifications, setNotifications } = props;
  const [isExpanded, setIsExpanded] = useState(
    props.defaultToExpanded ?? false
  );
  const removeNotification = useCallback(
    (notificationId: string) => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
    },
    [setNotifications]
  );
  if (!notifications.length) return null; // uncomment this line when you done testing
  return (
    <ModalWrapper enableBackgroundContentPress>
      {notifications.map((notification, index) => (
        <Notification
          notificationStyle={props.notificationStyle}
          key={notification.id}
          notification={notification}
          index={index}
          defaultToExpanded={props.defaultToExpanded}
          setNotifications={setNotifications}
          notifications={notifications}
          avoidStatusBar={props.avoidStatusBar}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          removeNotification={removeNotification}
          numberOfNotifications={notifications.length}
        />
      ))}
    </ModalWrapper>
  );
}
