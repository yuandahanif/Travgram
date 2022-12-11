import Ionicons from "@expo/vector-icons/Ionicons";

import {
  NavigationContainer,
  DefaultTheme,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "@screens/home";
import ProfileScreen from "@screens/profile";
import SettingScreen from "@screens/profile/setting";
import { COLORS } from "@config/constant";
import ExploreScreen from "@screens/explore";
import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "@screens/explore/quest/camera";
import QuestScreen from "@screens/explore/quest";
import GiftScreen from "@screens/gift";
import ExploreDetailScreen from "@screens/explore/detail";
import AboutUsScreen from "@screens/profile/setting/tentangkami";
import CityScreen from "@screens/explore/city";

export type ProfileDrawerList = {
  Profile: undefined;
  Setting: undefined;
  AboutUs: undefined;
};
const Drawer = createDrawerNavigator<ProfileDrawerList>();

const ProfileDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
      <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
    </Drawer.Navigator>
  );
};

export type ExploreStackParamList = {
  Explore: undefined;
  Quest: undefined;
  Detail: { cityId: string; wisataId: string };
  Camera: undefined;
  City: { cityId: string };
};

const Stack = createStackNavigator<ExploreStackParamList>();
const ExploreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Explore"
    >
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="Detail" component={ExploreDetailScreen} />
      <Stack.Screen name="City" component={CityScreen} />
      <Stack.Screen name="Quest" component={QuestScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export type BottomTabParamList = {
  Home: undefined;
  ExploreStack: NavigatorScreenParams<ExploreStackParamList>;
  Gift: undefined;
  ProfileDrawer: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();
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
          name="Gift"
          component={GiftScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="gift-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileDrawer"
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
