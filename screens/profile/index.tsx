import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

const PlaceholderImage = require("@assets/splash.png");

export default function ProfileScreen({}) {
  return (
    <View style={styles.container}>
      <Image source={PlaceholderImage} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 320 / 2,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
