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
import { f_kota, f_kota__wisata } from "types/firestore";
import { useAuthentication } from "@utils/useAuthentication";

export default function ExploreDetailScreen({
  navigation,
  route,
}: StackScreenProps<ExploreStackParamList, "Detail">) {
  const param = route.params;
  const { user } = useAuthentication();

  const kota = useDocument<f_kota>(FIRESTORE_ENTITY.kota.key, param?.cityId);

  const wisataMemo = useMemo<f_kota__wisata>(() => {
    if (!kota?.data()?.wisata) {
      return {
        deskripsi: "",
        gambar: [
          "https://safebooru.org//images/4041/5535c37fb16e207227e7360a9feb1b0614343642.jpg",
        ],
        nama: "",
      };
    }

    const data = kota?.data()?.wisata[param?.wisataId];
    if (data) {
      return data;
    }

    return {
      deskripsi: "",
      gambar: [
        "https://safebooru.org//images/4041/5535c37fb16e207227e7360a9feb1b0614343642.jpg",
      ],
      nama: "",
    };
  }, [kota]);

  const ListRenderer: ListRenderItem<string> = ({ item }) => (
    <StyledView className={`rounded-md overflow-hidden mr-2`}>
      <StyledImage source={{ uri: item }} className="h-52 w-52" />
    </StyledView>
  );

  const toQuest = () => {
    if (wisataMemo) {
      navigation.navigate("Quest", {
        cityId: param?.cityId,
        wisataId: param?.wisataId,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Gagal Membuka Quest.",
      });
    }
  };

  const toRoute = () => {
    if (wisataMemo) {
      navigation.navigate("Route", {
        cityId: param?.cityId,
        wisataId: param?.wisataId,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Gagal Membuka Rute.",
      });
    }
  };

  const toGallery = () => {
    if (wisataMemo && user?.uid) {
      navigation.navigate("Gallery", {
        cityId: param?.cityId,
        wisataId: param?.wisataId,
        userId: user?.uid,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Gagal Membuka Gallery.",
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
            data={[...wisataMemo.gambar]}
            renderItem={ListRenderer}
            keyExtractor={(item) => `${item}`}
          />
        </StyledView>

        <StyledView className="mx-2 py-4 flex-row justify-evenly">
          <StyledPressable className="items-center" onPress={toGallery}>
            <Ionicons name="image-outline" size={24} color="black" />
            <StyledText className="text-xs">Galeri</StyledText>
          </StyledPressable>
          <StyledPressable className="items-center" onPress={toQuest}>
            <Ionicons name="list-outline" size={24} color="black" />
            <StyledText className="text-xs">Quest</StyledText>
          </StyledPressable>
          <StyledPressable className="items-center" onPress={toRoute}>
            <Ionicons name="compass-outline" size={24} color="black" />
            <StyledText className="text-xs">Rute</StyledText>
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
