import { FlatList } from "react-native";

import containerStyle from "@styles/container.style";
import SearchHeader from "@components/header/SearchBar";
import {
  StyledImageBackground,
  StyledSafeAreaView,
  StyledText,
  StyledView,
} from "@components/styled";

const dummyData = [
  {
    id: 1,
    name: "Component With Background",
    image: "https://reactjs.org/logo-og.png",
  },
  {
    id: 2,
    name: "Embung UII v2",
    image:
      "https://sda.pu.go.id/balai/bbwsserayuopak/wp-content/uploads/2021/06/Embung-UII.jpg",
  },
  {
    id: 3,
    name: "Embung UII v3",
    image:
      "https://sda.pu.go.id/balai/bbwsserayuopak/wp-content/uploads/2021/06/Embung-UII.jpg",
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

const InfoCard = ({ item }: { item: typeof dummyData[number] }) => (
  <StyledImageBackground
    source={{ uri: item.image }}
    resizeMode="cover"
    className="flex-1 h-56 bg-slate-200 w-full mb-4 rounded-lg relative overflow-hidden"
  >
    <StyledView
      className="p-4 mt-auto"
      style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
    >
      <StyledText className="text-right text-white">{item.name}</StyledText>
    </StyledView>
  </StyledImageBackground>
);

export default function ExploreScreen({}) {
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
            renderItem={InfoCard}
            keyExtractor={(item) => `${item.id}`}
          />
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
}
