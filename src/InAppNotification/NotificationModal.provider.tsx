import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  type NotificationItem,
  type InAppNotificationProviderProps,
} from './notificationModal.types';
import { notificationMountTimer } from './notificationModal.constants';
import { InAppNotification } from './NotificationModal';
import { getSequantialRandomId } from '@shaquillehinds/react-native-essentials';

type InAppNotificationContextProps = {
  addNotification: (
    notificationItem: Omit<NotificationItem, 'id'>,
    id?: string
  ) => void;
  updateNotification: (
    notificationId: string,
    notificationItem: Omit<NotificationItem, 'id'>
  ) => void;
  removeNotification: (notificationId: string) => void;
};

const InAppNotificationContext =
  createContext<InAppNotificationContextProps | null>(null);

export function InAppNotificationProvider(
  props: PropsWithChildren<InAppNotificationProviderProps>
) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const addNotification: InAppNotificationContextProps['addNotification'] =
    useCallback((item, id) => {
      notificationMountTimer.start(() =>
        setNotifications((prev) => {
          if (!id) return [...prev, { ...item, id: getSequantialRandomId() }];
          const hasItem = prev.find((prevItem) => prevItem.id === id);
          if (hasItem) return prev;
          return [...prev, { ...item, id }];
        })
      );
    }, []);
  const updateNotification: InAppNotificationContextProps['updateNotification'] =
    useCallback((id, newItem) => {
      setNotifications((prev) =>
        prev.map((item) => (item.id === id ? { ...newItem, id } : item))
      );
    }, []);
  const removeNotification: InAppNotificationContextProps['removeNotification'] =
    useCallback((notificationId) => {
      setNotifications((prev) =>
        prev.filter((item) => item.id !== notificationId)
      );
    }, []);
  const value = useMemo(
    () => ({ addNotification, updateNotification, removeNotification }),
    []
  );
  return (
    <InAppNotificationContext.Provider value={value}>
      {props.children}
      <InAppNotification
        notifications={notifications}
        setNotifications={setNotifications}
        notificationStyle={props.notificationStyle}
        avoidStatusBar={props.avoidStatusBar}
      />
    </InAppNotificationContext.Provider>
  );
}

export function useInAppNotification() {
  const context = useContext(InAppNotificationContext);
  if (!context) {
    throw new Error(
      'useSmoothNotification must be in a SmoothNotificationProvider'
    );
  }

  return context;
}
