import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function HomeStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: 'Details',
          ...Platform.select({
            android: {
              presentation: 'modal',
            },
            ios: {
              presentation: 'formSheet',
            },
          }),
          sheetAllowedDetents: [0.7, 1.0],
        }}
      />
    </Stack>
  );
}
