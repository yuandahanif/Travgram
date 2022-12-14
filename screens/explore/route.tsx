import { StyledImage, StyledText, StyledView } from "@components/styled";
import { FlatList, ListRenderItem } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ExploreStackParamList } from "@navigation/userTab";
import { useMemo } from "react";
import { FIRESTORE_ENTITY, useDocument } from "@utils/useFirestore";
import { f_kota } from "types/firestore";

export default function ExploreTrackScreen({
  navigation,
  route,
}: StackScreenProps<ExploreStackParamList, "Route">) {
  const param = route.params;

  const kota = useDocument<f_kota>(FIRESTORE_ENTITY.kota.key, param?.cityId);

  const routeMemo = useMemo<string[] | undefined>(() => {
    if (!kota?.data()?.wisata[param?.wisataId]?.rute) {
      return [];
    }

    return kota?.data()?.wisata[param?.wisataId]?.rute;
  }, [kota]);

  const ListRenderer: ListRenderItem<string> = ({ item }) => (
    <StyledView
      className={`overflow-hidden mr-2 mb-4 flex-row justify-between items-center`}
    >
      <StyledText className=" text-base text-justify">{item}</StyledText>
    </StyledView>
  );

  return (
    <StyledView className="flex-1 w-full">
      <StyledText className="mx-2 mt-2 text-lg">Langkah menuju:</StyledText>
      <StyledText className="mx-2 text-black text-2xl font-bold">
        {kota?.data()?.wisata[param?.wisataId].nama}
      </StyledText>

      <StyledView className="my-4 mx-2">
        <FlatList
          data={routeMemo}
          renderItem={ListRenderer}
          keyExtractor={(item) => `${item}`}
          ListEmptyComponent={() => (
            <StyledView className="flex-1 items-center">
              <StyledImage
                className="w-32 h-32 mb-3"
                source={{
                  uri: "https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2022/09/bocchitherock_hitoricharacterpvscreenshot.png",
                }}
              />
              <StyledText>Belum ada rute untuk objek wisata ini.</StyledText>
            </StyledView>
          )}
        />
      </StyledView>

      <StyledView className="mx-2 py-4 "></StyledView>
    </StyledView>
  );
}
