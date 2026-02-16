import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="(home)" options={{ title: 'Home' }} />
      <Drawer.Screen name="(weapons)" options={{ title: 'Weapons' }} />
    </Drawer>
  );
}
