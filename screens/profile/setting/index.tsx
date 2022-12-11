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
import { StyledPressable } from "@components/styled";

const auth = getAuth(app);

export default function SettingScreen({}) {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <StyledPressable className="bg-lime-500 px-12 py-2 rounded-lg mt-5" onPress={logout}>
        <Text>Logout</Text>
      </StyledPressable>


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
