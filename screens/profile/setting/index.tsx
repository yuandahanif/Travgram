import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getAuth, signOut } from "firebase/auth";
import app from "@config/firebase";
import { Pressable } from "react-native";
import textStyle from "@styles/text.style";
import { COLORS } from "@config/constant";
import { SafeAreaView } from "react-native-safe-area-context";

const auth = getAuth(app);

export default function SettingScreen({}) {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={logout}>
        <Text style={textStyle.textMain}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS["bg-main"],
    alignItems: "center",
    justifyContent: "center",
  },
});
