import { FlatList, ListRenderItem } from "react-native";

import containerStyle from "@styles/container.style";
import {
  StyledImageBackground,
  StyledPressable,
  StyledSafeAreaView,
  StyledText,
  StyledView,
} from "@components/styled";

import { ExploreStackParamList } from "@navigation/userTab";
import { StackScreenProps } from "@react-navigation/stack";
import { FIRESTORE_ENTITY, useFirestore } from "@utils/useFirestore";
import { useMemo } from "react";

export default function CityScreen({
  navigation,
  route,
}: StackScreenProps<ExploreStackParamList, "City">) {
  const param = route.params;

  const toQuestScreen = (id: string) => {
    navigation.navigate("Detail", {
      cityId: param?.cityId || "",
      wisataId: id,
    });
  };

  const kota = useFirestore<f_kota>(FIRESTORE_ENTITY.kota.key, {
    id: param?.cityId,
  });

  const wisataMemo = useMemo(() => {
    if (!kota.getDocument?.data()?.wisata) {
      return [];
    }

    const data = kota.getDocument?.data()?.wisata;
    const res: f_kota__wisata[] = [];

    for (const key in data) {
      res.push({ ...data[key], id: key });
    }

    return res;
  }, [kota]);

  const ListRenderer: ListRenderItem<f_kota__wisata> = ({ item }) => {
    // console.log("file: city.tsx:35 ~ item", item);
    return (
      <StyledPressable
        onPress={() => toQuestScreen(item?.id || "")}
        className="flex-1 h-56 w-full rounded-lg relative overflow-hidden"
      >
        <StyledImageBackground
          source={{ uri: item.gambar[0] }}
          resizeMode="cover"
          className="flex-1 bg-slate-200 mb-4"
        >
          <StyledView
            className="p-4 mt-auto"
            style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
          >
            <StyledText className="text-right text-white">
              {item?.nama}
            </StyledText>
          </StyledView>
        </StyledImageBackground>
      </StyledPressable>
    );
  };

  return (
    <StyledSafeAreaView style={containerStyle.default}>
      <StyledView className="flex-1 w-full p-2">
        <StyledText className="text-lg font-semibold mb-2">
          Jelajahi Objek wisata
        </StyledText>

        {kota.getDocument?.data() && (
          <>
            <StyledView>
              <StyledText>{kota.getDocument?.data()?.nama}</StyledText>
            </StyledView>

            <StyledView className="pb-5">
              <FlatList
                data={wisataMemo}
                renderItem={ListRenderer}
                extraData={toQuestScreen}
                keyExtractor={(item) => {
                  return `${item.id}`;
                }}
              />
            </StyledView>
          </>
        )}
      </StyledView>
    </StyledSafeAreaView>
  );
}
