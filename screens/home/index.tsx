import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMemo, useState } from "react";
import { COLORS } from "@config/constant";
import SearchHeader from "@components/header/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import containerStyle from "@styles/container.style";
import textStyle from "@styles/text.style";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Modal } from "react-native";
import { Pressable } from "react-native";
import {
  StyledImageBackground,
  StyledPressable,
  StyledText,
  StyledView,
} from "@components/styled";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "@navigation/userTab";
import {
  FIRESTORE_ENTITY,
  useCollection,
  useDocument,
} from "@utils/useFirestore";
import {
  f_home_nearest,
  f_home_popular,
  f_kota,
  f_pengguna,
} from "types/firestore";
import { useAuthentication } from "@utils/useAuthentication";

const PointCard = ({
  NavigatetoGift,
  userId,
}: {
  NavigatetoGift: () => void;
  userId: string;
}) => {
  const styles = StyleSheet.create({
    card: {
      width: "95%",
      height: 120,
      borderRadius: 10,
      padding: 15,
      margin: 10,
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

  const pengguna = useDocument<f_pengguna>(
    FIRESTORE_ENTITY.pengguna.key,
    userId
  );

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={[textStyle.textWhite, styles.title]}>Poinmu</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={[textStyle.textWhite, styles.point]}>
            {pengguna?.data()?.total_poin || 0}
          </Text>

          {/* <View style={{ marginLeft: 5, position: "relative" }}>
            <Ionicons
              name="trending-up-outline"
              color={COLORS["green-main"]}
              size={20}
            />
            <Text style={[textStyle.textWhite, { fontSize: 10 }]}>0</Text>
          </View> */}
        </View>

        {/* <Text style={[textStyle.textWhite, { fontSize: 10 }]}>Cek Riwayat</Text> */}
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
  const { user } = useAuthentication();

  const kota_populer = useCollection<f_home_popular>(
    FIRESTORE_ENTITY.home_popular.key
  );

  const kota_nearest = useCollection<f_home_nearest>(
    FIRESTORE_ENTITY.home_nearest.key
  );

  const [modalVisible, setModalVisible] = useState(false);

  const toGiftScreen = () => {
    navigation.navigate("Gift");
  };

  return (
    <SafeAreaView style={containerStyle.default}>
      <SearchHeader />

      <ScrollView>
        {user?.uid && (
          <PointCard NavigatetoGift={toGiftScreen} userId={user?.uid} />
        )}

        <StyledView
          style={{
            height: 240,
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              {
                // nama: "Masjid Ulil Albab UII",
                link: "https://sewamobiljogja.id/wp-content/uploads/2019/09/paket-liburan-ke-jogja.jpg",
              },
              {
                // nama: "Tugu Jogja",
                link: "https://img.okezone.com/content/2021/02/11/406/2360355/wow-wisata-dalam-negeri-diskon-hingga-95-bulan-ini-cek-link-promo-mister-aladin-di-sini-ZXw5NMluks.JPG",
              },
            ].map((data) => (
              <StyledImageBackground
                className="rounded-lg overflow-hidden"
                source={{
                  uri: data.link,
                }}
                key={data.link}
                style={[
                  {
                    marginHorizontal: 10,
                    marginVertical: 0,
                    width: 360,
                    height: 240,
                  },
                ]}
              >
                {/* <StyledView
                  className="p-4 mt-auto w-full"
                  style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
                >
                  <StyledText className="text-right text-white">
                    {data.nama}
                  </StyledText>
                </StyledView> */}
              </StyledImageBackground>
            ))}
          </ScrollView>
        </StyledView>

        <StyledText className="text-left mr-auto ml-4 mb-2 mt-4 font-semibold text-lg">
          Populer Minggu ini
        </StyledText>

        <StyledView
          style={{
            height: 240,
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {kota_populer?.docs.map((data) => (
              <StyledImageBackground
                className="rounded-lg overflow-hidden"
                source={{
                  uri: data.data().gambar,
                }}
                key={data.id}
                style={[
                  {
                    marginHorizontal: 10,
                    marginVertical: 0,
                    width: 360,
                    height: 240,
                  },
                ]}
              >
                <StyledView
                  className="p-4 mt-auto w-full"
                  style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
                >
                  <StyledText className="text-right text-xl text-white">
                    {data.data().nama}
                  </StyledText>
                  <StyledText className="text-right text-white">
                    {data.data().kota}
                  </StyledText>
                </StyledView>
              </StyledImageBackground>
            ))}
          </ScrollView>
        </StyledView>

        <StyledText className="text-left mr-auto ml-4 mb-2 mt-4 font-semibold text-lg">
          Lokasi wisata terdekat
        </StyledText>

        <StyledView
          style={{
            height: 240,
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {kota_nearest?.docs.map((data) => (
              <StyledImageBackground
                className="rounded-lg overflow-hidden"
                source={{
                  uri: data.data().gambar,
                }}
                key={data.id}
                style={[
                  {
                    marginHorizontal: 10,
                    marginVertical: 0,
                    width: 360,
                    height: 240,
                  },
                ]}
              >
                <StyledView
                  className="p-4 mt-auto w-full"
                  style={{ backgroundColor: "rgba(51, 65, 85, 0.61)" }}
                >
                  <StyledText className="text-right text-xl text-white">
                    {data.data().nama}
                  </StyledText>
                  <StyledText className="text-right text-white">
                    {data.data().kota}
                  </StyledText>
                </StyledView>
              </StyledImageBackground>
            ))}
          </ScrollView>
        </StyledView>

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
      </ScrollView>
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
