import { COLORS } from "@config/constant";
import containerStyle from "@styles/container.style";
import textStyle from "@styles/text.style";
import { useAuthentication } from "@utils/useAuthentication";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PlaceholderImage = require("@assets/splash.png");

export default function ProfileScreen({}) {
  const { user } = useAuthentication();

  return (
    <SafeAreaView style={containerStyle.default}>
      {user?.photoURL ? (
        <Image source={{ uri: user?.photoURL }} style={styles.image} />
      ) : (
        <Image source={PlaceholderImage} style={styles.image} />
      )}

      <Text style={textStyle.textMain}>{user?.displayName || user?.email}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
    borderRadius: 320 / 2,
    overflow: "hidden",
  },
});
