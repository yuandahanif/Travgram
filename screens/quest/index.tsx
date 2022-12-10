import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Pressable } from "react-native";
import textStyle from "@styles/text.style";
import { COLORS } from "@config/constant";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuestScreen({}) {


  return (
    <SafeAreaView style={styles.container}>
      <Pressable>
        <Text style={textStyle.textMain}>mmm</Text>
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
