import {
  StyledImage,
  StyledImageBackground,
  StyledPressable,
  StyledSafeAreaView,
  StyledText,
  StyledView,
} from "@components/styled";
import { FlatList, ListRenderItem, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ExploreStackParamList } from "@navigation/userTab";
import { useMemo } from "react";
import { FIRESTORE_ENTITY, useFirestore } from "@utils/useFirestore";

export default function ExploreDetailScreen({
  navigation,
  route,
}: StackScreenProps<ExploreStackParamList, "Detail">) {
  const param = route.params;

  const kota = useFirestore<f_kota>(FIRESTORE_ENTITY.kota.key, {
    id: param?.cityId,
  });

  const wisataMemo = useMemo<f_kota__wisata>(() => {
    if (!kota.getDocument?.data()?.wisata) {
      return { deskripsi: "", gambar: [""], nama: "" };
    }

    const data = kota.getDocument?.data()?.wisata[param?.wisataId];
    if (data) {
      return data;
    }

    return { deskripsi: "", gambar: [""], nama: "" };
  }, [kota]);

  const ListRenderer: ListRenderItem<string> = ({ item }) => (
    <StyledView className={`rounded-md overflow-hidden mr-2`}>
      <StyledImage source={{ uri: item }} className="h-52 w-52" />
    </StyledView>
  );

  const toCamera = () => {
    navigation.navigate("Camera");
  };

  return (
    <StyledView className="flex-1 items-center">
      <ScrollView>
        <StyledText className="mx-2 mt-2 text-black text-2xl font-bold">
          {wisataMemo.nama}
        </StyledText>

        <StyledView className="my-4 mx-2">
          <FlatList
            horizontal
            data={[...wisataMemo.gambar.slice(1)]}
            renderItem={ListRenderer}
            keyExtractor={(item) => `${item}`}
          />
        </StyledView>

        <StyledView className="mx-2">
          <StyledText className=" text-base text-justify">
            {wisataMemo.deskripsi}
          </StyledText>
        </StyledView>

        <StyledView className="w-full">
          <StyledText className=" text-base text-justify">
            <StyledPressable onPress={toCamera}>
              <StyledText>Kamera</StyledText>
            </StyledPressable>
          </StyledText>
        </StyledView>
      </ScrollView>
    </StyledView>
  );
}
