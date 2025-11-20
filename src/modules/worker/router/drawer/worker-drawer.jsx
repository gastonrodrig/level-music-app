import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen, ProfileScreen } from '../../screens';
import { CustomDrawer } from '../../../../shared/ui';

const Drawer = createDrawerNavigator();

export const WorkerDrawer = () => {
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawer{...props} />} 
      initialRouteName="Home"
      screenOptions={{
        drawerLabelStyle: { fontSize: 16 }, 
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options= {{
          drawerIcon: () => <Ionicons name="home-outline" size={22} color="#e38532ff" />
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options= {{
          drawerIcon: () => <Ionicons name="person-circle-outline" size={22} color="#e38532ff" />
        }}
      />
    </Drawer.Navigator>
  );
}