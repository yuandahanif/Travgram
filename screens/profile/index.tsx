import {
  StyledImage,
  StyledSafeAreaView,
  StyledText,
} from "@components/styled";
import { useAuthentication } from "@utils/useAuthentication";
import { Pressable } from "react-native";

export default function ProfileScreen({}) {
  const { user } = useAuthentication();

  const openDrawer = () => {


  }

  return (
    <StyledSafeAreaView className="flex-1 justify-center items-center">
      {user?.photoURL ? (
        <StyledImage source={{ uri: user?.photoURL }} className="w-40 h-40" />
      ) : (
        <StyledImage
          source={{
            uri: "https://safebooru.org//samples/4049/sample_80dedcf6518f3d50c3d7a5073266f7fa2bb7c536.jpg?",
          }}
          className="w-40 h-40"
        />
      )}

      <StyledText className="mt-4 text-base">
        {user?.displayName || user?.email}
      </StyledText>

      <StyledText className="mt-4 text-base">
        ikan        
      </StyledText>

      <StyledText className="mt-4 text-base">
        Pengaturan   
      </StyledText>

      <Pressable onPress={openDrawer}>
        <StyledText>Setting</StyledText>
      </Pressable>
      
    </StyledSafeAreaView>


  );
}
