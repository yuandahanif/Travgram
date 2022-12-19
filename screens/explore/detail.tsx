import {
  StyledImage,
  StyledPressable,
  StyledText,
  StyledView,
} from "@components/styled";
import { FlatList, ListRenderItem, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ExploreStackParamList } from "@navigation/userTab";
import { useMemo } from "react";
import { FIRESTORE_ENTITY, useDocument } from "@utils/useFirestore";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import { Ionicons } from "@expo/vector-icons";

export default function ExploreDetailScreen({
  navigation,
  route,
}: StackScreenProps<ExploreStackParamList, "Detail">) {
  const param = route.params;

  const kota = useDocument<f_kota>(FIRESTORE_ENTITY.kota.key, param?.cityId);

  const wisataMemo = useMemo<f_kota__wisata>(() => {
    if (!kota?.data()?.wisata) {
      return { deskripsi: "", gambar: [""], nama: "" };
    }

    const data = kota?.data()?.wisata[param?.wisataId];
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
    if (wisataMemo) {
      navigation.navigate("Camera", {
        cityId: param?.cityId,
        wisataId: param?.wisataId,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Gagal Membuka kamera.",
      });
    }
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

        <StyledView className="mx-2 py-4 flex-row justify-evenly">
          <StyledPressable className="items-center" onPress={toCamera}>
            <Ionicons name="md-camera-outline" size={24} color="black" />
            <StyledText>Kamera</StyledText>
          </StyledPressable>
          <StyledPressable className="items-center" onPress={toCamera}>
            <Ionicons name="list-outline" size={24} color="black" />
            <StyledText>Quest</StyledText>
          </StyledPressable>
          <StyledPressable className="items-center" onPress={toCamera}>
            <Ionicons name="compass-outline" size={24} color="black" />
            <StyledText>Rute</StyledText>
          </StyledPressable>
        </StyledView>

        <StyledView className="mx-2">
          <StyledText className=" text-base text-justify">
            {wisataMemo.deskripsi}
          </StyledText>
        </StyledView>
      </ScrollView>
    </StyledView>
  );
}
