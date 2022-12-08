import { COLORS } from "@config/constant";
import textStyle from "@styles/text.style";
import { useAuthentication } from "@utils/useAuthentication";
import { Image, StyleSheet, Text, View } from "react-native";

const PlaceholderImage = require("@assets/splash.png");

export default function ProfileScreen({}) {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      {user?.photoURL ? (
        <Image source={{ uri: user?.photoURL }} style={styles.image} />
      ) : (
        <Image source={PlaceholderImage} style={styles.image} />
      )}

      <Text style={textStyle.textWhite}>{user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS["dark-main"],
    alignItems: "center",
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 320 / 2,
    overflow: "hidden",
  },
});
