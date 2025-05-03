import storage from '@/helpers/auth';
import { router } from 'expo-router';
import { HelpCircle, LogOut, Settings } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  const handleLogout = async () => {
    await storage.deleteItem('user');
    await storage.deleteItem('token');
    router.replace('/login');
  };
  return (
    <View style={styles.menuContainer}>
      <View>
        <Pressable style={styles.menuItem}>
          <Settings size={20} color="#333" />
          <Text style={styles.menuText}>Settings</Text>
        </Pressable>

        <Pressable style={styles.menuItem}>
          <HelpCircle size={20} color="#333" />
          <Text style={styles.menuText}>Help</Text>
        </Pressable>
      </View>
      <View>
        <View style={styles.divider} />
        <Pressable
          style={{ ...styles.menuItem, marginLeft: 'auto' }}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#FF3B30" />
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    marginHorizontal: 8,
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    height: '100%',
    // width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  logoutText: {
    color: '#FF3B30',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
  },
});
