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
import EditProfileScreen from "@screens/profile/setting/edit";
import { SafeAreaProvider } from "react-native-safe-area-context";

export type ProfileDrawerList = {
  Profile: undefined;
  Setting: undefined;
  AboutUs: undefined;
  editname: undefined;
};
const Drawer = createDrawerNavigator<ProfileDrawerList>();

const ProfileDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Setting" component={SettingScreen} />
      <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
      <Drawer.Screen
        name="editname"
        component={EditProfileScreen}
        options={{ title: "Edit profil" }}
      />
    </Drawer.Navigator>
  );
};

export type ExploreStackParamList = {
  Explore: undefined;
  Quest: { cityId: string; wisataId: string };
  Detail: { cityId: string; wisataId: string };
  Camera: { cityId: string; wisataId: string };
  City: { cityId: string };
};

const Stack = createStackNavigator<ExploreStackParamList>();
const ExploreStack = () => {
  return (
    <Stack.Navigator
      // screenOptions={{ headerShown: false }}
      initialRouteName="Explore"
    >
      <Stack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={ExploreDetailScreen}
        options={{ title: "Detail" }}
      />
      <Stack.Screen
        name="City"
        component={CityScreen}
        options={{ title: "Kota" }}
      />
      <Stack.Screen name="Quest" component={QuestScreen} />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
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
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
