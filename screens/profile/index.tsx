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
  const { user, extra } = useAuthentication();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const toedirscreen = () => {
    navigation.navigate("editname");
  };

  return (
    <StyledSafeAreaView className="flex-1 justify-center items-center">
      {user?.photoURL ? (
        <StyledImage source={{ uri: user?.photoURL }} className="w-40 h-40" />
      ) : (
        <StyledImage
          source={{
            uri: "https://image.myanimelist.net/ui/5LYzTBVoS196gvYvw3zjwHP3hetS_Ytm8aI68DQbZdE",
          }}
          className="w-40 h-40 rounded-lg overflow-hidden"
        />
      )}

      <StyledText className="mt-4 text-base">{extra?.nama_pengguna}</StyledText>
      <StyledText className="mt-4 text-base">{extra?.no_hp}</StyledText>
      <StyledText className="mt-4 text-base">{extra?.alamat}</StyledText>

      <StyledPressable
        className="bg-lime-500 px-8 py-2 rounded-lg mt-5"
        onPress={openDrawer}
      >
        <StyledText>Setting</StyledText>
      </StyledPressable>

      <StyledPressable
        className="bg-lime-500 px-8 py-2 rounded-lg mt-5"
        onPress={toedirscreen}
      >
        <StyledText>Edit Profille</StyledText>
      </StyledPressable>
    </StyledSafeAreaView>
  );
}
