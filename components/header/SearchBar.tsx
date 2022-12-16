import { StyleSheet, View, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@config/constant";
import { useNavigation } from "@react-navigation/native";
import { StyledView } from "@components/styled";

interface Props {}

export default function SearchHeader({}: Props) {
  const navigation = useNavigation();

  return (
    <StyledView className="flex-row bg-blue-main items-center p-3 px-10">
      <StyledView className="flex-row rounded-full px-3 bg-white items-center">
        <Ionicons name="search" size={24} color={COLORS["blue-main"]} />
        <TextInput style={styles.input} placeholder="Cari" />
      </StyledView>

      <Pressable
        style={styles.cameraButton}
        onPress={() => {
          // console.log(navigation.getParent("Explore"));
          // navigation.navigate("Camera");
        }}
      >
        <Ionicons name="camera-outline" size={24} color={COLORS["white"]} />
      </Pressable>
    </StyledView>
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
