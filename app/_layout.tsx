import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#ae87de80',
          },
          headerTintColor: 'black',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
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
