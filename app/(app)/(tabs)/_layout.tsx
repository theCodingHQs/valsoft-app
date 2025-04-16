import storage from '@/helpers/auth';
import { router, Tabs } from 'expo-router';
import { List, LogOut } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {

  const handleLogout = async () => {
    await storage.deleteItem('user');
    router.replace('/login');
    console.log("Logout pressed")
  }
  
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        
        tabBarActiveTintColor: "#007AFF",
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
            <LogOut size={24} color="#007AFF" />
          </TouchableOpacity>
        ),
      }}
    >
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