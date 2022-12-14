import {
  StyledImage,
  StyledPressable,
  StyledSafeAreaView,
  StyledText,
} from "@components/styled";
import { ProfileDrawerList } from "@navigation/userTab";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useAuthentication } from "@utils/useAuthentication";

export default function ProfileScreen({
  navigation,
}: DrawerScreenProps<ProfileDrawerList>) {
  const { user } = useAuthentication();

  const openDrawer = () => {
    navigation.openDrawer()
  }


  const toAboutScreen = () => {
    navigation.navigate('AboutUs')
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
          className="w-40 h-40 rounded-lg overflow-hidden"
        />
      )}

      <StyledText className="mt-4 text-base">
        {user?.displayName || user?.email}
      </StyledText>

      {/* <StyledText className="mt-4 text-base">
        ikan
      </StyledText>

      <StyledText className="mt-4 text-base">
        Pengaturan
      </StyledText> */}

      <StyledPressable className="bg-lime-500 px-8 py-2 rounded-lg mt-5" onPress={openDrawer}>
        <StyledText>Setting</StyledText>
      </StyledPressable>



    </StyledSafeAreaView>


  );
}
