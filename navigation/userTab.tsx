import Ionicons from "@expo/vector-icons/Ionicons";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "@screens/home";
import ProfileScreen from "@screens/profile";
import SettingScreen from "@screens/profile/setting";
import { COLORS } from "@config/constant";
import ExploreScreen from "@screens/explore";
import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "@screens/quest/camera";
import QuestScreen from "@screens/quest";

const Drawer = createDrawerNavigator();
const ProfileDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator();
const ExploreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="Quest" component={QuestScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
export default function UserTab() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarActiveTintColor: COLORS["blue-main"],
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ExploreStack"
          component={ExploreStack}
          options={{
            tabBarLabel: "Jelajah",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Hadiah"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="gift-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ProvileDrawer"
          component={ProfileDrawer}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
