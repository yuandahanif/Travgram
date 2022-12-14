import * as React from "react";
import { useAuthentication } from "@utils/useAuthentication";
import AuthStack from "@navigation/authStack";
import UserTab from "@navigation/userTab";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function App() {
  const { user } = useAuthentication();

  return (
    <>
      <StatusBar style="light" />
      {user ? <UserTab /> : <AuthStack />}
      <Toast />
    </>
  );
}
