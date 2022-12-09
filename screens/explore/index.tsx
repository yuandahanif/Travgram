import {
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import app from "@config/firebase";
import { Pressable } from "react-native";
import textStyle from "@styles/text.style";
import { COLORS } from "@config/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import containerStyle from "@styles/container.style";
import SearchHeader from "@components/header/SearchBar";

const dummyData = [
  {
    id: 1,
    name: "Embung UII",
  },
  {
    id: 2,
    name: "Embung UII v2",
  },
  {
    id: 3,
    name: "Embung UII v3",
  },
  {
    id: 4,
    name: "Embung UII v4",
  },
  {
    id: 5,
    name: "Embung UII v5",
  },
  {
    id: 6,
    name: "Embung UII v6",
  },
  {
    id: 7,
    name: "Embung UII v7",
  },
];

const InfoCard = ({ item }: { item: typeof dummyData[number] }) => (
  <View
    style={[
      styles.infoCard,
      {
        marginHorizontal: 0,
        marginVertical: 5,
        // width: 360,
        height: 100,
      },
    ]}
  >
    <View>
      <Text style={textStyle.textWhite}>{item.name}</Text>
    </View>
  </View>
);

export default function ExploreScreen({}) {
  return (
    <SafeAreaView style={containerStyle.default}>
      <SearchHeader />

      <View style={styles.container}>
        <Text style={styles.subTitle}>Jelajahi Objek wisata</Text>

        <View>
          <FlatList
            data={dummyData}
            renderItem={InfoCard}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
    backgroundColor: COLORS["bg-main"],
  },

  subTitle: {
    marginBottom: 10,
    fontWeight: "600",
    fontSize: 20,
  },

  infoCard: {
    // width: "100%",
    height: 120,
    borderRadius: 10,
    padding: 15,
    margin: 20,
    flexDirection: "row",
    backgroundColor: COLORS["blue-main"],
  },
});
