import { FlatList, ListRenderItem, Pressable } from "react-native";

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

const dummyData = [
  {
    id: 1,
    name: "Component With Background",
    image: "https://reactjs.org/logo-og.png",
  },
  {
    id: 2,
    name: "Kobeee!",
    image:
      "https://safebooru.org//samples/4049/sample_7cdb9e71e0a3a88069ae8ccc3588489b29ab914d.jpg?4230457",
  },
  {
    id: 3,
    name: "Rendang Makima Jakal",
    image:
      "https://static.wikia.nocookie.net/chainsaw-man/images/9/9d/Denji%27s_meal.png",
  },
  {
    id: 4,
    name: "Embung UII v4",
    image:
      "https://sda.pu.go.id/balai/bbwsserayuopak/wp-content/uploads/2021/06/Embung-UII.jpg",
  },
  {
    id: 5,
    name: "Embung UII v5",
    image:
      "https://sda.pu.go.id/balai/bbwsserayuopak/wp-content/uploads/2021/06/Embung-UII.jpg",
  },
  {
    id: 6,
    name: "Embung UII v6",
    image:
      "https://sda.pu.go.id/balai/bbwsserayuopak/wp-content/uploads/2021/06/Embung-UII.jpg",
  },
  {
    id: 7,
    name: "Embung UII v7",
    image:
      "https://sda.pu.go.id/balai/bbwsserayuopak/wp-content/uploads/2021/06/Embung-UII.jpg",
  },
];

export default function ExploreScreen({
  navigation,
}: StackScreenProps<ExploreStackParamList>) {
  const toQuestScreen = () => {
    navigation.navigate("Detail");
  };
  const kota = useFirestore(FIRESTORE_ENTITY.kota.key);

  const ListRenderer: ListRenderItem<{
    id: number;
    name: string;
    image: string;
  }> = ({ item }) => (
    <StyledPressable
      onPress={toQuestScreen}
      className="flex-1 h-56 w-full rounded-lg relative overflow-hidden"
    >
      <StyledImageBackground
        source={{ uri: item.image }}
        resizeMode="cover"
        className="flex-1 bg-slate-200 mb-4"
      >
        <StyledView
          className="p-4 mt-auto"
          style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
        >
          <StyledText className="text-right text-white">{item.name}</StyledText>
        </StyledView>
      </StyledImageBackground>
    </StyledPressable>
  );

  return (
    <StyledSafeAreaView style={containerStyle.default}>
      <SearchHeader />

      <StyledView className="flex-1 w-full p-2">
        <StyledText className="text-lg font-semibold mb-2">
          Jelajahi Objek wisata
        </StyledText>

        <StyledView className="pb-5">
          <FlatList
            data={dummyData}
            renderItem={ListRenderer}
            extraData={toQuestScreen}
            keyExtractor={(item) => `${item.id}`}
          />
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
}
