import { StyleSheet, View, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@config/constant";
import { useNavigation } from "@react-navigation/native";

interface Props {}

export default function SearchHeader({}: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={24} color={COLORS["green-main"]} />
        <TextInput style={styles.input} placeholder="Cari" />
      </View>

      <Pressable
        style={styles.cameraButton}
        onPress={() => {
          // console.log(navigation.getParent("Explore"));

          // navigation.navigate("Camera");
        }}
      >
        <Ionicons name="camera-outline" size={24} color={COLORS["white"]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS["green-main"],
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 40,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
  },

  input: {
    width: "100%",
    color: COLORS["text-main"],
    paddingVertical: 5,
    paddingHorizontal: 20,
    paddingLeft: 5,
  },

  cameraButton: {
    marginLeft: 15,
  },
});
