import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { COLORS } from "@config/constant";
import SearchHeader from "@components/header/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import containerStyle from "@styles/container.style";
import textStyle from "@styles/text.style";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Modal } from "react-native";
import { Pressable } from "react-native";
import { StyledPressable, StyledText, StyledView } from "@components/styled";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "@navigation/userTab";

const PointCard = ({ NavigatetoGift }: { NavigatetoGift: () => void }) => {
  const styles = StyleSheet.create({
    card: {
      width: "95%",
      height: 120,
      borderRadius: 10,
      padding: 15,
      margin: 20,
      flexDirection: "row",
      backgroundColor: COLORS["blue-main"],
    },

    left: {
      // backgroundColor: "red",
      flex: 1,
    },

    title: {
      fontSize: 20,
      fontWeight: "500",
    },

    point: {
      fontSize: 30,
      fontWeight: "600",
    },

    line: {
      borderRadius: 2,
      borderWidth: 2,
      borderColor: "white",
      // marginHorizontal: 25,
      backgroundColor: "white",
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={[textStyle.textWhite, styles.title]}>Poinmu</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={[textStyle.textWhite, styles.point]}>1.234</Text>

          <View style={{ marginLeft: 5, position: "relative" }}>
            <Ionicons
              name="trending-up-outline"
              color={COLORS["green-main"]}
              size={20}
            />
            <Text style={[textStyle.textWhite, { fontSize: 10 }]}>1.23</Text>
          </View>
        </View>

        <Text style={[textStyle.textWhite, { fontSize: 10 }]}>Cek Riwayat</Text>
      </View>

      <View style={styles.line} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          flex: 1.7,
        }}
      >
        <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
          <Ionicons
            name="trending-up-outline"
            color={COLORS["green-main"]}
            size={40}
          />
          <Text style={[textStyle.textWhite, { fontSize: 16 }]}>Kumpulkan</Text>
        </Pressable>

        <Pressable
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={NavigatetoGift}
        >
          <Ionicons
            name="trending-up-outline"
            color={COLORS["green-main"]}
            size={40}
          />
          <Text style={[textStyle.textWhite, { fontSize: 16 }]}>Tukar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default function HomeScreen({
  navigation,
}: BottomTabScreenProps<BottomTabParamList>) {
  const [modalVisible, setModalVisible] = useState(false);

  const toGiftScreen = () => {
    navigation.navigate("Gift");
  };

  return (
    <SafeAreaView style={containerStyle.default}>
      <SearchHeader />

      <PointCard NavigatetoGift={toGiftScreen} />

      <View
        style={{
          height: 150,
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((i) => (
            <View
              key={i}
              style={[
                styles.infoCard,
                {
                  marginHorizontal: 10,
                  marginVertical: 0,
                  width: 360,
                  height: 100,
                },
              ]}
            >
              <View>
                <Text style={textStyle.textWhite}>Poinmu</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <StyledView className="flex-1 justify-center items-center">
          <StyledView className="bg-white items-center w-5/6 p-4 py-3 shadow rounded-lg border border-blue-main">
            <StyledText className="text-lg text-center font-semibold mb-4">
              Absen Harian
            </StyledText>

            <StyledView className="flex-row w-full gap-2 items-center justify-center mb-2">
              {[1, 2, 3].map((v) => (
                <StyledPressable
                  key={v.toString()}
                  className={`grow bg-blue-main  py-5 rounded-md flex items-center`}
                >
                  <StyledText className="text-white">Hari ke {v}</StyledText>
                </StyledPressable>
              ))}
            </StyledView>

            <StyledView className="flex-row w-full items-center justify-center gap-x-2 mb-2">
              {[4, 5, 6].map((v) => (
                <StyledPressable
                  key={v.toString()}
                  className={`grow bg-blue-main  py-5 rounded-md flex items-center`}
                >
                  <StyledText className="text-white">Hari ke {v}</StyledText>
                </StyledPressable>
              ))}
            </StyledView>

            <StyledView className="flex-row w-full items-center justify-center px-1">
              <StyledPressable
                className={`grow bg-blue-main w-full py-5 rounded-md flex items-center mb-8`}
              >
                <StyledText className="text-white">Hari ke 7</StyledText>
              </StyledPressable>
            </StyledView>

            <StyledPressable
              className="bg-lime-500 px-8 py-2 rounded-lg"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Tutup</Text>
            </StyledPressable>
          </StyledView>
        </StyledView>
      </Modal>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.floatingBtn}
      >
        <Ionicons
          name="calendar-outline"
          size={30}
          color={COLORS["blue-main"]}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    width: "95%",
    height: 120,
    borderRadius: 10,
    padding: 15,
    margin: 20,
    flexDirection: "row",
    backgroundColor: COLORS["blue-main"],
  },

  floatingBtn: {
    borderWidth: 1,
    borderColor: COLORS["blue-main"],
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    position: "absolute",
    bottom: 30,
    left: 10,
    backgroundColor: "#fff",
    borderRadius: 100,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
