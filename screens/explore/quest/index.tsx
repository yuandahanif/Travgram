import {
  StyledImage,
  StyledPressable,
  StyledText,
  StyledView,
} from "@components/styled";
import { FlatList, ListRenderItem } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ExploreStackParamList } from "@navigation/userTab";
import { useMemo } from "react";
import { FIRESTORE_ENTITY, useDocument } from "@utils/useFirestore";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import { Ionicons } from "@expo/vector-icons";
import { f_kota, f_quest } from "types/firestore";

export default function ExploreQuestScreen({
  navigation,
  route,
}: StackScreenProps<ExploreStackParamList, "Quest">) {
  const param = route.params;

  const kota = useDocument<f_kota>(FIRESTORE_ENTITY.kota.key, param?.cityId);
  const questMemo = useMemo<f_quest[]>(() => {
    if (!kota?.data()?.wisata[param?.wisataId]?.quests) {
      return [];
    }

    const res: f_quest[] = [];
    const data = kota?.data()?.wisata[param?.wisataId]?.quests;

    for (const key in data) {
      res.push({ ...data[key], id: key });
    }

    return res;
  }, [kota]);

  const toCamera = (questId: string) => {
    if (questMemo) {
      navigation.navigate("Camera", {
        cityId: param?.cityId,
        wisataId: param?.wisataId,
        questId: questId,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Gagal Membuka kamera.",
      });
    }
  };

  const ListRenderer: ListRenderItem<f_quest> = ({ item }) => (
    <StyledView
      className={`overflow-hidden mr-2 mb-4 flex-row justify-between items-center h-28`}
    >
      <StyledView className="rounded-md overflow-hidden">
        <StyledImage
          source={{ uri: item.file_urls[0] }}
          className="h-28 w-28"
        />
      </StyledView>

      <StyledView className="items-start justify-start flex-1 h-full ml-2">
        <StyledText className="text-black text-lg font-bold">
          {item.nama}
        </StyledText>
        <StyledText className=" text-base text-justify">
          {item.deskripsi}
        </StyledText>
      </StyledView>

      <StyledPressable
        className="items-center"
        onPress={() => toCamera(item.id || "")}
      >
        <Ionicons name="md-camera-outline" size={24} color="black" />
        <StyledText className="text-xs">Kamera</StyledText>
      </StyledPressable>
    </StyledView>
  );

  return (
    <StyledView className="flex-1 w-full">
      <StyledText className="mx-2 mt-2">
        Objek yang tidak boleh anda lewatkan di:
      </StyledText>
      <StyledText className="mx-2 text-black text-2xl font-bold">
        {kota?.data()?.nama}
      </StyledText>

      <StyledView className="my-4 mx-2">
        <FlatList
          data={questMemo}
          renderItem={ListRenderer}
          keyExtractor={(item) => `${item}`}
        />
      </StyledView>

      <StyledView className="mx-2 py-4 "></StyledView>
    </StyledView>
  );
}
