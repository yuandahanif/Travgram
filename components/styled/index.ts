import { styled } from "nativewind";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledPressable = styled(Pressable);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledImageBackground = styled(ImageBackground);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

export {
  StyledPressable,
  StyledText,
  StyledView,
  StyledSafeAreaView,
  StyledImageBackground,
  StyledImage,
  StyledTouchableOpacity,
};
