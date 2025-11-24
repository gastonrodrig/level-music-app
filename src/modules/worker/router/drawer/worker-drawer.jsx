import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen, ProfileScreen, EventDetailsScreen } from '../../screens';
import { CustomDrawer } from '../../../../shared/ui';
import { ActivitiesByPhaseScreen } from '../../screens/activitie-phase';
import { UploadEvidence } from '../../screens/upload-evidence';

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
      {/* // Pantalla de Detalles del Evento */}
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
          // Elimina headerRight de aquí, se maneja en el componente
        })}
      />
      {/* Pantalla de Actividades por Fase */}
      <Drawer.Screen 
        name="ActivitiesByPhase" 
        component={ActivitiesByPhaseScreen} 
        
        options={({ route, navigation }) => ({ 
          
          drawerItemStyle: { display: 'none' }, 
          headerShown: true,
          title: route.params?.phase || 'Actividades', 
          headerStyle: { backgroundColor: '#ffffff' },
          headerTitleAlign: 'center',

          // 2. CORRECCIÓN EN EL BOTÓN
          headerLeft: () => (
             <Ionicons 
               name="arrow-back" 
               size={24} 
               color="#333" 
               style={{ marginLeft: 16 }}
               // Usamos la variable 'navigation' que sacamos arriba, NO 'props.navigation'
               onPress={() => navigation.goBack()} 
             />
          ),
        })}
      />

      <Drawer.Screen 
        name="ActivityDetail" 
        component={UploadEvidence} 
        options={({ navigation }) => ({
          drawerItemStyle: { display: 'none' }, // Oculto del menú
          headerShown: true,
          title: 'Detalle de Actividad',
          headerTitleAlign: 'center',
          headerLeft: () => (
             <Ionicons 
               name="arrow-back" 
               size={24} 
               color="#333" 
               style={{ marginLeft: 16 }}
               onPress={() => navigation.goBack()} 
             />
          ),
        })}
      />

    </Drawer.Navigator>
  );
}