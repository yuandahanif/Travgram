import { COLORS } from "@config/constant";
import { StyleSheet } from "react-native";

export const textStyle = StyleSheet.create({
  textWhite: { color: COLORS.white },
  textBlue: { color: COLORS["blue-main"] },
  textTitle: {
    marginBottom: 200,
    color: COLORS["white"],
    fontSize: 60,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default textStyle;
