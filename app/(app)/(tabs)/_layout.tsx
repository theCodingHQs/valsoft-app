import { Tabs } from 'expo-router';
import { List } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007AFF',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Valuations',
          tabBarIcon: ({ color, size }) => <List size={size} color={color} />,
        }}
      />
      
     
    </Tabs>
  );
}