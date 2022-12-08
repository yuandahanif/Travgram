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

const auth = getAuth(app);

export default function SettingScreen({}) {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={logout}>
        <Text style={textStyle.textWhite}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS["dark-main"],
    alignItems: "center",
    justifyContent: "center"
  },
});
