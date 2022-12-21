import { FlatList, ListRenderItem } from "react-native";

import containerStyle from "@styles/container.style";
import {
  StyledImageBackground,
  StyledPressable,
  StyledText,
  StyledView,
} from "@components/styled";

import { ExploreStackParamList } from "@navigation/userTab";
import { StackScreenProps } from "@react-navigation/stack";
import { FIRESTORE_ENTITY, useDocument } from "@utils/useFirestore";
import { useMemo } from "react";
import { f_kota, f_kota__wisata } from "types/firestore";

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

  const kota = useDocument<f_kota>(FIRESTORE_ENTITY.kota.key, param?.cityId);

  const wisataMemo = useMemo(() => {
    if (!kota?.data()?.wisata) {
      return [];
    }

    const data = kota?.data()?.wisata;
    const res: f_kota__wisata[] = [];

    for (const key in data) {
      res.push({ ...data[key], id: key });
    }

    return res;
  }, [kota]);

  const ListRenderer: ListRenderItem<f_kota__wisata> = ({ item }) => {
    return (
      <StyledPressable
        onPress={() => toQuestScreen(item?.id || "")}
        className="flex-1 h-64 w-full rounded-lg relative overflow-hidden"
      >
        <StyledImageBackground
          source={{
            uri:
              item.gambar instanceof Array
                ? item.gambar[0]
                : "https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2022/09/bocchitherock_hitoricharacterpvscreenshot.png",
          }}
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
    <StyledView className="flex-1 p-2">
      {kota?.data() && (
        <>
          <StyledText className="text-lg font-semibold mb-3">
            Jelajahi Objek wisata {kota?.data()?.nama}
          </StyledText>

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
  );
}
