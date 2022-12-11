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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StyledImageBackground
          className="flex-1 w-full bg-cyan-300"
          source={{
            uri:
              wisataMemo.gambar[0] ||
              "https://safebooru.org//images/3991/297975c6585c8bd315a2d274997e7463947c28fc.jpg",
          }}
        >
          {/* <GestureDetector gesture={onDrag}> */}
          <StyledView className="flex-1 pt-20 items-center">
            <StyledView
              className="flex-1 p-5 py-5 rounded-t-lg w-11/12"
              style={{ backgroundColor: "rgba(255,255,255,1)" }}
            >
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
                    data={[
                      ...wisataMemo.gambar.slice(1),
                      // "https://safebooru.org//images/3976/68e8e629c133ea5220b655d722beb2a9f57e2497.jpg",
                      // "https://safebooru.org//samples/3974/sample_ccc853861ab89c8f8ff293e905fc75c02bb6fad0.jpg",
                      // "https://safebooru.org//images/4049/9499cab519c579f31a209f5d22d282c96941a52d.jpg",
                      // "https://safebooru.org//samples/3964/sample_790bdb87777f25a8f04e1646a27ad6a6c1d19c60.jpg",
                    ]}
                    renderItem={ListRenderer}
                    keyExtractor={(item) => `${item}`}
                  />
                </StyledView>
              </ScrollView>
            </StyledView>
          </StyledView>
          {/* </GestureDetector> */}
        </StyledImageBackground>
      </GestureHandlerRootView>
    </StyledSafeAreaView>
  );
}
