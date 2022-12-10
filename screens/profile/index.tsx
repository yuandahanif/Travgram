import {
  StyledImage,
  StyledSafeAreaView,
  StyledText,
} from "@components/styled";
import { useAuthentication } from "@utils/useAuthentication";

export default function ProfileScreen({}) {
  const { user } = useAuthentication();

  return (
    <StyledSafeAreaView className="flex-1 justify-center items-center">
      {user?.photoURL ? (
        <StyledImage source={{ uri: user?.photoURL }} className="w-40 h-40" />
      ) : (
        <StyledImage
          source={{
            uri: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/350/exploding-head_1f92f.png",
          }}
          className="w-20 h-20"
        />
      )}

      <StyledText className="mt-4 text-base">
        {user?.displayName || user?.email}
      </StyledText>
    </StyledSafeAreaView>
  );
}
