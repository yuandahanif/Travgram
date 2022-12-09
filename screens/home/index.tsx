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

export default function HomeScreen({}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={containerStyle.default}>
      <SearchHeader />

      <View style={styles.infoCard}>
        <View>
          <Text style={textStyle.textWhite}>Poinmu</Text>
          <Text style={textStyle.textWhite}>1.234</Text>
        </View>
      </View>

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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Tutup</Text>
            </Pressable>
          </View>
        </View>
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
