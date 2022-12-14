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
import { GestureHandlerRootView } from "react-native-gesture-handler";
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

  return (
    <StyledSafeAreaView className="flex-1">
      <StyledView className="flex-1 items-center p-5">
        <ScrollView>
          <StyledText className="text-black text-2xl font-semibold">
            {wisataMemo.nama}
          </StyledText>

          <StyledView className="my-2 w-full">
            <StyledText>{wisataMemo.deskripsi}</StyledText>
          </StyledView>

          <StyledView className="mb-6">
            <FlatList
              horizontal
              data={[...wisataMemo.gambar.slice(1)]}
              renderItem={ListRenderer}
              keyExtractor={(item) => `${item}`}
            />
          </StyledView>
        </ScrollView>
      </StyledView>
    </StyledSafeAreaView>
  );
}
