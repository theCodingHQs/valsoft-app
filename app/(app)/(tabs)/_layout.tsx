import storage from '@/helpers/auth';
import { useSearchStore } from '@/store/search';
import { router, Tabs } from 'expo-router';
import { List, LogOut, MoreVerticalIcon, User } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const setQuery = useSearchStore((state) => state.setQuery);
  

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: true,
        headerSearchBarOptions: { autoFocus: true, onChangeText(e) {
          setQuery(e.nativeEvent.text);
        }, },
        tabBarActiveTintColor: '#007AFF',
        // headerRight: () => (
        //   <TouchableOpacity onPress={handleLogout} style={{ flexDirection: "row", alignItems: "center" }}>
        //     <LogOut size={24} color="#007AFF" />
        //   </TouchableOpacity>
        // ),
      }}
    >
      <Tabs.Screen
        name="valuations"
        options={{
          title: 'Valuations',
          tabBarIcon: ({ color, size }) => <List size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="all-valuations"
        options={{
          title: 'All Valuations',
          tabBarIcon: ({ color, size }) => <List size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => <MoreVerticalIcon size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
