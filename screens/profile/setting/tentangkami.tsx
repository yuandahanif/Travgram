import {
    StyledImage,
    StyledPressable,
    StyledSafeAreaView,
    StyledText,
  } from "@components/styled";
  import { ProfileDrawerList } from "@navigation/userTab";
  import { DrawerScreenProps } from "@react-navigation/drawer";
  import { useAuthentication } from "@utils/useAuthentication";
  import { Pressable } from "react-native";
  
  export default function ProfileScreen({
    navigation,
  }: DrawerScreenProps<ProfileDrawerList>) {
    const { user } = useAuthentication();
  
    const openDrawer = () => {
      navigation.openDrawer()
  
    }

    const toAboutScreen = () => {
        navigation.goBack()
      }
  
    return (
      <StyledSafeAreaView className="flex-1 justify-center items-center">
         <StyledText className="mt-5 text-4xl font-semibold">
            About Us
        </StyledText>

        <StyledText className="px-5 mt-5 text-base">
          TravGram adalah sebuah aplikasi yang membantu {"\n"}
          orang-orang yang hendak melakukan liburan agar{"\n"}
          Dengan aplikasi ini  mereka akan mendapatkan{"\n"}
          tourguide terkait lokasi-lokasi yang harus mereka {"\n"}
          kunjungi selama berlibur di kota tersebut{"\n"}
          {"\n"}
          Aplikasi ini dibuat oleh:{"\n"}
          - Yuanda Hanif Hisyam (20523134){"\n"}
          - Bintang Ananda (20523160){"\n"}
          - Ivan Aditya Nugraha (20523180){"\n"}
          {"\n"}
          Untuk pertanyaan lebih lanjut terkait aplikasi kami,{"\n"}
          dapat menghubungi email:{"\n"}
           20523080@Students.uii.ac.id {"\n"}
           20523134@Students.uii.ac.id {"\n"}
           20523160@Students.uii.ac.id {"\n"}
           {"\n"}
           Sekian kata sambutan dari kami{"\n"}
           Wassalamsualaikum wr, wb.

           

        </StyledText>

        <StyledPressable className="bg-lime-500 px-8 py-2 rounded-rg mt-9 mx-auto mr-6" onPress={toAboutScreen}>
        <StyledText>Kembali</StyledText>
      </StyledPressable>
  
      </StyledSafeAreaView>
  
  
    );
  }
  