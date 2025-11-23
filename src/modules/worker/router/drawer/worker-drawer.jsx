import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen, ProfileScreen, EventDetailsScreen } from '../../screens';
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
        name="Perfil" 
        component={ProfileScreen} 
        options= {{
          drawerIcon: () => <Ionicons name="person-circle-outline" size={22} color="#e38532ff" />
        }}
      />
      <Drawer.Screen 
        name="EventDetails" 
        component={EventDetailsScreen} 
        options={({ route }) => ({
          drawerItemStyle: { display: 'none' },
          headerShown: true,
          title: route.params?.eventData?.title || 'Detalle del Evento',
          headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 1,
            shadowOpacity: 0.1,
          },
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: '600',
            color: '#333',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <Ionicons 
              name="document-text-outline" 
              size={22} 
              color="#333" 
              style={{ marginRight: 16 }}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
}