import { FlatList, ListRenderItem } from "react-native";

import containerStyle from "@styles/container.style";
import SearchHeader from "@components/header/SearchBar";
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
import { QueryDocumentSnapshot } from "firebase/firestore";

export default function ExploreScreen({
  navigation,
}: StackScreenProps<ExploreStackParamList>) {
  const toQuestScreen = (id: string) => {
    navigation.navigate("City", { cityId: id });
  };

  const kota = useFirestore<f_kota>(FIRESTORE_ENTITY.kota.key);

  const ListRenderer: ListRenderItem<QueryDocumentSnapshot<f_kota>> = ({
    item,
  }) => {
    const data = item?.data();

    return (
      <StyledPressable
        onPress={() => toQuestScreen(item?.id)}
        className="flex-1 h-56 w-full rounded-lg relative overflow-hidden"
      >
        <StyledImageBackground
          source={{ uri: data.gambar }}
          resizeMode="cover"
          className="flex-1 bg-slate-200 mb-4"
        >
          <StyledView
            className="p-4 mt-auto"
            style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
          >
            <StyledText className="text-right text-white">
              {data.nama}
            </StyledText>
          </StyledView>
        </StyledImageBackground>
      </StyledPressable>
    );
  };

  return (
    <StyledSafeAreaView style={containerStyle.default}>
      <SearchHeader />

      <StyledView className="flex-1 w-full p-2">
        <StyledText className="text-lg font-semibold mb-2">
          Pilih kota wisata tujuanmu
        </StyledText>

        <StyledView className="pb-5">
          <FlatList
            data={kota?.getQuery?.docs || []}
            renderItem={ListRenderer}
            extraData={toQuestScreen}
            keyExtractor={(item) => {
              const data = item?.data();
              return `${data.nama}_${data.gambar}`;
            }}
          />
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
}
