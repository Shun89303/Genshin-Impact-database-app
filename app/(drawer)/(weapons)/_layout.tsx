import { Stack } from 'expo-router';

export default function WeaponLayout() {
  return (
    <Stack>
      <Stack.Screen name="weapon" options={{ headerShown: false }} />
    </Stack>
  );
}
