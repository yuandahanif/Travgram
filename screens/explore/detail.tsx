import {
  StyledImage,
  StyledImageBackground,
  StyledPressable,
  StyledSafeAreaView,
  StyledText,
  StyledView,
} from "@components/styled";
import { FlatList, ListRenderItem } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ExploreStackParamList } from "@navigation/userTab";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useMemo } from "react";

export default function ExploreDetailScreen({
  navigation,
}: StackScreenProps<ExploreStackParamList>) {
  const onDrag = useMemo(
    () =>
      Gesture.Pan().onUpdate((e) => {
        console.log(e.translationY);

        // translateX.value = e.translationX;
        // translateY.value = e.translationY;
      }),
    // .onStart((e) => {
    //   e.translationX += translateX.value;
    //   e.translationY += translateY.value;
    // }),
    // .onStart((event) => {
    //   event.translationX = translateX.value;
    //   event.translationY = translateY.value;
    // })
    []
  );

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
            uri: "https://safebooru.org//samples/4049/sample_7d44efd81e53b7f037e402975aa3cc22e0d02e85.jpg",
          }}
        >
          {/* <GestureDetector gesture={onDrag}> */}
            <StyledView className="flex-1 pt-52 items-center">
              <StyledView
                className="flex-1 p-10 py-5 rounded-t-lg w-11/12"
                style={{ backgroundColor: "rgba(255,255,255,1)" }}
              >
                <StyledText className="text-black text-2xl font-semibold">
                  Embung UII
                </StyledText>

                <StyledView className="my-2">
                  <StyledText>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam, magni ipsum! Velit ut pariatur reprehenderit
                    quibusdam accusantium a explicabo autem dicta libero totam,
                    earum, fuga impedit esse, veniam eligendi perferendis.
                  </StyledText>
                </StyledView>

                <StyledView>
                  <FlatList
                    horizontal
                    data={[
                      "https://safebooru.org//images/3976/68e8e629c133ea5220b655d722beb2a9f57e2497.jpg",
                      "https://safebooru.org//samples/3974/sample_ccc853861ab89c8f8ff293e905fc75c02bb6fad0.jpg",
                      "https://safebooru.org//images/4049/9499cab519c579f31a209f5d22d282c96941a52d.jpg",
                      "https://safebooru.org//samples/3964/sample_790bdb87777f25a8f04e1646a27ad6a6c1d19c60.jpg",
                    ]}
                    renderItem={ListRenderer}
                    keyExtractor={(item) => `${item}`}
                  />
                </StyledView>

                <StyledView className="my-2">
                  <StyledText className="text-black text-xl font-semibold">
                    Komentar
                  </StyledText>

                  <StyledText>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam, magni ipsum! Velit ut pariatur reprehenderit
                    quibusdam accusantium a explicabo autem dicta libero totam,
                    earum, fuga impedit esse, veniam eligendi perferendis.
                  </StyledText>
                </StyledView>
              </StyledView>
            </StyledView>
          {/* </GestureDetector> */}
        </StyledImageBackground>
      </GestureHandlerRootView>
    </StyledSafeAreaView>
  );
}
