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
import ExploreTrackScreen from "@screens/explore/route";
import ExploreGalleryScreen from "@screens/explore/gallery";
import { getAuth, signOut } from "firebase/auth";
import app from "@config/firebase";
import ProfileGalleryScreen from "@screens/profile/gallery";
import { useEffect } from "react";

export type ProfileDrawerList = {
  Profile: undefined;
  Setting: undefined;
  AboutUs: undefined;
  editname: undefined;
  Gallery: undefined;
  Logout: undefined;
};
const Drawer = createDrawerNavigator<ProfileDrawerList>();
const auth = getAuth(app);

function LogoutScreen({}) {
 useEffect(() => {
  try {
    signOut(auth);
  } catch (error) {}
 }, [])

 return <></>
}

const ProfileDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="editname"
        component={EditProfileScreen}
        options={{ title: "Edit profil" }}
      />
      <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

export type ExploreStackParamList = {
  Explore: undefined;
  Route: { cityId: string; wisataId: string };
  Quest: { cityId: string; wisataId: string };
  Detail: { cityId: string; wisataId: string };
  Camera: { cityId: string; wisataId: string; questId: string; userId: string };
  Gallery: { cityId: string; wisataId: string; userId: string };
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
      <Stack.Screen
        name="Route"
        component={ExploreTrackScreen}
        options={{ title: "Rute" }}
      />
      <Stack.Screen name="Quest" component={QuestScreen} />
      <Stack.Screen name="Gallery" component={ExploreGalleryScreen} />
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
              tabBarLabel: "Hadiah",
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
