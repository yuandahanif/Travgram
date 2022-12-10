import containerStyle from "@styles/container.style";
import {
  StyledImage,
  StyledSafeAreaView,
  StyledText,
  StyledView,
} from "@components/styled";

export default function GiftScreen({}) {
  return (
    <StyledSafeAreaView style={containerStyle.default}>
      <StyledView className="flex-1 w-full p-2 justify-center items-center">
        <StyledImage
          className="h-40 w-40"
          source={{
            uri: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/350/wrapped-gift_1f381.png",
          }}
        />

        <StyledText className="text-sm font-semibold mt-2">
          Fitur Sedang falam pengembangan.
        </StyledText>
      </StyledView>
    </StyledSafeAreaView>
  );
}
