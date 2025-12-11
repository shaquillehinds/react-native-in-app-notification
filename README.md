# @shaquillehinds/react-native-in-app-notification

[![npm version](https://img.shields.io/npm/v/@shaquillehinds/react-native-in-app-notification.svg)](https://www.npmjs.com/package/@shaquillehinds/react-native-in-app-notification)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A beautiful, customizable, and performant in-app notification system for React Native that just works. Built with React Native Reanimated for smooth 60fps animations and gesture support.

<img src="https://raw.githubusercontent.com/shaquillehinds/react-native-in-app-notification/master/assets/inappnotification.gif" alt="example" height="500"/>

## ✨ Features

- 🎨 **Fully Customizable** - Complete control over styling, sizing, and behavior
- 📱 **Cross-Platform** - Works seamlessly on iOS and Android
- 🎭 **Flexible Content** - Support for both data-driven notifications and custom components
- 🖼️ **Image Support** - Automatic detection and optimization for expo-image, react-native-fast-image, or standard Image
- ⚡ **Performant** - Built on Reanimated for smooth 60fps animations
- 👆 **Gesture Support** - Swipe up to dismiss notifications
- 📐 **Responsive** - Automatic orientation and screen size handling
- 🎯 **TypeScript** - Full TypeScript support with comprehensive type definitions
- 🎪 **Queue Management** - Smart notification stacking and timing
- 🔔 **Lifecycle Hooks** - onEnter, onLeave, and onPress callbacks

## 📦 Installation

```bash
npm install @shaquillehinds/react-native-in-app-notification
```

or

```bash
yarn add @shaquillehinds/react-native-in-app-notification
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react-native-reanimated react-native-gesture-handler
```

or

```bash
yarn add react-native-reanimated react-native-gesture-handler
```

**Note**: This package depends on `@shaquillehinds/react-native-essentials` which will be installed automatically.

### Additional Configuration

For **React Native Reanimated**, add the Babel plugin to your `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

For **React Native Gesture Handler**, wrap your app with `GestureHandlerRootView`:

```typescript
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app code */}
    </GestureHandlerRootView>
  );
}
```

## 🚀 Quick Start

### 1. Wrap Your App with the Provider

```typescript
import { InAppNotificationProvider } from '@shaquillehinds/react-native-in-app-notification';

export default function App() {
  return (
    <InAppNotificationProvider>
      {/* Your app code */}
    </InAppNotificationProvider>
  );
}
```

### 2. Use the Hook to Show Notifications

```typescript
import { useInAppNotification } from '@shaquillehinds/react-native-in-app-notification';

function MyComponent() {
  const { addNotification } = useInAppNotification();

  const showNotification = () => {
    addNotification({
      content: {
        type: 'data',
        payload: {
          title: 'Success!',
          message: 'Your action was completed successfully.',
        },
      },
      duration: 3000,
    });
  };

  return (
    <Button title="Show Notification" onPress={showNotification} />
  );
}
```

## 📖 API Reference

### InAppNotificationProvider

The provider component that manages notification state and renders notifications.

#### Props

| Prop                | Type                   | Default     | Description                                         |
| ------------------- | ---------------------- | ----------- | --------------------------------------------------- |
| `notificationStyle` | `StyleProp<ViewStyle>` | `undefined` | Global style applied to all notifications           |
| `avoidStatusBar`    | `boolean`              | `undefined` | Whether to avoid the status bar area (Android only) |
| `width`             | `number`               | `85`        | Default notification width (percentage)             |
| `height`            | `number`               | `undefined` | Default notification height (percentage)            |
| `titleWidth`        | `number`               | `70`        | Default title width (percentage)                    |
| `messageWidth`      | `number`               | `70`        | Default message width (percentage)                  |
| `contentWidth`      | `number`               | `undefined` | Default content container width (percentage)        |
| `imageSize`         | `number`               | `12`        | Default image size (percentage)                     |
| `borderRadius`      | `number`               | `5`         | Default border radius (percentage)                  |

#### Example

```typescript
<InAppNotificationProvider
  avoidStatusBar={true}
  width={90}
  borderRadius={8}
  notificationStyle={{
    backgroundColor: '#1a1a1a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }}
>
  {children}
</InAppNotificationProvider>
```

### useInAppNotification Hook

Returns methods to control notifications.

#### Return Value

```typescript
{
  addNotification: (notificationItem: Omit<NotificationItem, 'id'>, id?: string) => void;
  updateNotification: (notificationId: string, notificationItem: Omit<NotificationItem, 'id'>) => void;
  removeNotification: (notificationId: string) => void;
}
```

#### Methods

##### `addNotification(notificationItem, id?)`

Adds a new notification to the queue.

- `notificationItem`: The notification configuration (without id)
- `id` (optional): Custom notification ID for tracking

##### `updateNotification(notificationId, notificationItem)`

Updates an existing notification.

- `notificationId`: The ID of the notification to update
- `notificationItem`: The new notification configuration

##### `removeNotification(notificationId)`

Removes a notification from the queue.

- `notificationId`: The ID of the notification to remove

### NotificationItem Type

The core notification configuration object.

```typescript
type NotificationItem = {
  id: string; // Auto-generated if not provided
  style?: StyleProp<ViewStyle>; // Individual notification style
  content: NotificationContent; // Notification content
  duration?: number; // Display duration in milliseconds (default: 5000)
  activeOpacity?: number; // Touch opacity (default: 0.8)
  onPress?: (content: NotificationContent, dismiss: () => void) => void;
  onNotificationLeave?: () => void;
  onNotificationEnter?: () => void;
};
```

### NotificationContent Type

Defines the notification content, which can be either data-driven or a custom component.

#### Data Type Notification

```typescript
{
  type: 'data';
  payload: {
    title?: string;
    message?: string;
    Icon?: JSX.Element;
    image?: ImageSourcePropType;
    imageStyle?: StyleProp<ImageStyle>;
    titleStyle?: StyleProp<TextStyle>;
    messageStyle?: StyleProp<TextStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    // Size overrides
    width?: number;
    height?: number;
    titleWidth?: number;
    messageWidth?: number;
    contentWidth?: number;
    imageSize?: number;
    borderRadius?: number;
  };
}
```

#### Component Type Notification

```typescript
{
  type: 'component';
  payload: React.ReactNode;
}
```

## 💡 Usage Examples

### Basic Text Notification

```typescript
const { addNotification } = useInAppNotification();

addNotification({
  content: {
    type: 'data',
    payload: {
      title: 'New Message',
      message: 'You have received a new message from John.',
    },
  },
  duration: 4000,
});
```

### Notification with Image

```typescript
addNotification({
  content: {
    type: 'data',
    payload: {
      title: 'Profile Updated',
      message: 'Your profile picture has been changed.',
      image: require('./assets/avatar.png'),
      imageStyle: {
        borderRadius: 25,
      },
    },
  },
});
```

### Notification with Custom Icon

```typescript
import { Icon } from 'your-icon-library';

addNotification({
  content: {
    type: 'data',
    payload: {
      title: 'Success!',
      message: 'Operation completed successfully.',
      Icon: <Icon name="check-circle" size={40} color="#4CAF50" />,
    },
  },
});
```

### Custom Styled Notification

```typescript
addNotification({
  content: {
    type: 'data',
    payload: {
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      titleStyle: {
        color: '#F44336',
        fontWeight: 'bold',
        fontSize: 16,
      },
      messageStyle: {
        color: '#666',
        fontSize: 14,
      },
      contentContainerStyle: {
        backgroundColor: '#FFEBEE',
        padding: 16,
      },
    },
  },
  style: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  duration: 5000,
});
```

### Interactive Notification

```typescript
addNotification({
  content: {
    type: 'data',
    payload: {
      title: 'New Friend Request',
      message: 'John Doe wants to connect with you.',
      image: { uri: 'https://example.com/avatar.jpg' },
    },
  },
  onPress: (content, dismiss) => {
    // Navigate to friend request screen
    navigation.navigate('FriendRequests');
    dismiss(); // Dismiss the notification
  },
  activeOpacity: 0.7,
});
```

### Custom Component Notification

```typescript
const CustomNotification = () => (
  <View style={{ padding: 20, backgroundColor: '#2196F3', borderRadius: 10 }}>
    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
      Custom Design
    </Text>
    <Text style={{ color: 'white', fontSize: 14 }}>
      You have full control over the UI!
    </Text>
  </View>
);

addNotification({
  content: {
    type: 'component',
    payload: <CustomNotification />,
  },
  duration: 3000,
});
```

### Notification with Lifecycle Callbacks

```typescript
addNotification({
  content: {
    type: 'data',
    payload: {
      title: 'Download Complete',
      message: 'Your file has been downloaded successfully.',
    },
  },
  onNotificationEnter: () => {
    console.log('Notification appeared');
    // Play sound, haptic feedback, etc.
  },
  onNotificationLeave: () => {
    console.log('Notification dismissed');
    // Cleanup, analytics, etc.
  },
});
```

### Updating a Notification

```typescript
const { addNotification, updateNotification } = useInAppNotification();

// Add with custom ID
const notificationId = 'download-progress';

addNotification(
  {
    content: {
      type: 'data',
      payload: {
        title: 'Downloading...',
        message: '0% complete',
      },
    },
    duration: 10000,
  },
  notificationId
);

// Later, update the progress
updateNotification(notificationId, {
  content: {
    type: 'data',
    payload: {
      title: 'Downloading...',
      message: '50% complete',
    },
  },
  duration: 10000,
});
```

### Notification Queue Example

```typescript
// Notifications will automatically stack and animate nicely
const showMultiple = () => {
  addNotification({
    content: {
      type: 'data',
      payload: { title: 'First', message: 'First notification' },
    },
  });

  addNotification({
    content: {
      type: 'data',
      payload: { title: 'Second', message: 'Second notification' },
    },
  });

  addNotification({
    content: {
      type: 'data',
      payload: { title: 'Third', message: 'Third notification' },
    },
  });
};
```

## 🎨 Styling Guide

### Global Styling

Use the provider props to set default styles for all notifications:

```typescript
<InAppNotificationProvider
  width={88}
  borderRadius={12}
  notificationStyle={{
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  }}
>
```

### Per-Notification Styling

Override global styles for individual notifications:

```typescript
addNotification({
  content: {
    type: 'data',
    payload: {
      title: 'Special Notification',
      message: 'This one looks different!',
      titleStyle: { color: '#9C27B0' },
      messageStyle: { color: '#555' },
      contentContainerStyle: {
        backgroundColor: '#F3E5F5',
      },
    },
  },
  style: {
    width: '95%',
    borderRadius: 15,
  },
});
```

### Theme System Example

```typescript
// Define your notification themes
const notificationThemes = {
  success: {
    style: {
      borderLeftWidth: 4,
      borderLeftColor: '#4CAF50',
    },
    payload: {
      titleStyle: { color: '#2E7D32' },
      contentContainerStyle: { backgroundColor: '#E8F5E9' },
    },
  },
  error: {
    style: {
      borderLeftWidth: 4,
      borderLeftColor: '#F44336',
    },
    payload: {
      titleStyle: { color: '#C62828' },
      contentContainerStyle: { backgroundColor: '#FFEBEE' },
    },
  },
  info: {
    style: {
      borderLeftWidth: 4,
      borderLeftColor: '#2196F3',
    },
    payload: {
      titleStyle: { color: '#1565C0' },
      contentContainerStyle: { backgroundColor: '#E3F2FD' },
    },
  },
};

// Use the themes
const showSuccess = (title: string, message: string) => {
  addNotification({
    content: {
      type: 'data',
      payload: {
        title,
        message,
        ...notificationThemes.success.payload,
      },
    },
    style: notificationThemes.success.style,
  });
};
```

## 🔧 Advanced Configuration

### Responsive Sizing

All size values are percentages relative to screen dimensions:

```typescript
<InAppNotificationProvider
  width={85}           // 85% of screen width
  height={10}          // 10% of screen height
  imageSize={15}       // 15% of screen width
  titleWidth={70}      // 70% of notification width
  messageWidth={70}    // 70% of notification width
  borderRadius={6}     // 6% of shortest screen dimension
/>
```

### Image Handling

The package automatically detects and uses the best image component available:

1. `expo-image` (preferred)
2. `react-native-fast-image`
3. Standard `Image` (fallback)

No additional configuration needed!

### Android Status Bar

On Android, you can control whether notifications avoid the status bar:

```typescript
<InAppNotificationProvider avoidStatusBar={true}>
```

### Performance Optimization

For best performance:

1. Memoize custom components used in notifications
2. Use callback refs for lifecycle hooks
3. Limit the number of simultaneous notifications (3-5 recommended)
4. Use appropriate durations (3000-5000ms for most cases)

## 🐛 Troubleshooting

### Notifications Not Showing

1. Ensure `InAppNotificationProvider` wraps your component tree
2. Verify `GestureHandlerRootView` wraps your app
3. Check that Reanimated is properly configured

### Animation Issues

1. Make sure Reanimated Babel plugin is last in your plugins array
2. Clear Metro cache: `npx react-native start --reset-cache`
3. Rebuild your app after adding the Babel plugin

### TypeScript Errors

Ensure you have the correct peer dependency versions installed:

```bash
npm install --save-dev @types/react @types/react-native
```

### Custom Components Not Rendering

When using `type: 'component'`, ensure your component:

- Is wrapped in a View with proper dimensions
- Handles its own styling completely
- Doesn't rely on parent context that might not be available

## 📝 TypeScript Support

Full TypeScript definitions are included. Import types as needed:

```typescript
import type {
  NotificationItem,
  NotificationContent,
  NotificationDataPayload,
  NotificationSizeOptions,
  InAppNotificationProviderProps,
} from '@shaquillehinds/react-native-in-app-notification';
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

## 📄 License

MIT © [Shaquille Hinds](https://github.com/shaquillehinds)

## 🔗 Links

- [GitHub Repository](https://github.com/shaquillehinds/react-native-in-app-notification)
- [npm Package](https://www.npmjs.com/package/@shaquillehinds/react-native-in-app-notification)
- [Report Issues](https://github.com/shaquillehinds/react-native-in-app-notification/issues)
- [View Changelog](https://github.com/shaquillehinds/react-native-in-app-notification/releases)

## 🙏 Dependencies

This package is built on top of excellent open-source projects:

- [@shaquillehinds/react-native-essentials](https://github.com/shaquillehinds/react-native-essentials)
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
- [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)

---

Made with ❤️ by [Shaquille Hinds](https://github.com/shaquillehinds)
