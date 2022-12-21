import { StyledPressable, StyledText, StyledView } from "@components/styled";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import app, { db } from "@config/firebase";
import { useAuthentication } from "@utils/useAuthentication";
import Toast from "react-native-toast-message";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app);

const EditProfileScreen = () => {
  const { user, extra } = useAuthentication();

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  const [nama, setnama] = useState("");
  const [nama_pengguna, setnama_namapengguna] = useState("");
  const [no_hp, setno_hp] = useState("");
  const [alamat, setalamat] = useState("");

  const create = () => {
    if (!extra) {
      Toast.show({
        type: "error",
        text1: "Ups ada yang bermasalah!",
      });
    }

    const data = {
      nama: extra?.nama,
      nama_pengguna: extra?.nama_pengguna,
      no_hp: extra?.no_hp,
      alamat: extra?.alamat,
    };
    if (nama != "") {
      data.nama = nama;
    }
    if (nama_pengguna != "") {
      data.nama_pengguna = nama_pengguna;
    }
    if (no_hp != "") {
      data.no_hp = no_hp;
    }
    if (alamat != "") {
      data.alamat = alamat;
    }

    if (user?.uid) {
      setDoc(doc(db, "pengguna", user?.uid), data)
        .then(() => {
          console.log("data submitted");
          Toast.show({
            type: "success",
            text1: "Akun anda berhasil di update",
            text2: "Semoga hari mu menyenangkan 😊",
          });
          logout();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("ERROR: uid tidak ada");
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <StyledView className="border-b border-r-red-50 ">
        <StyledText className="mr-2 text-lg">Nama :</StyledText>
        <TextInput
          value={nama}
          maxLength={10}
          style={{ height: 40, fontSize: 18 }}
          placeholder={extra?.nama}
          onChangeText={(nama) => setnama(nama)}
        />
      </StyledView>

      <StyledView className="border-b border-r-red-500">
        <StyledText className="mr-2 text-lg">Nama Pengguna :</StyledText>
        <TextInput
          value={nama_pengguna}
          maxLength={30}
          style={{ height: 40, fontSize: 18 }}
          placeholder={extra?.nama_pengguna}
          onChangeText={(nama_pengguna) => setnama_namapengguna(nama_pengguna)}
        />
      </StyledView>

      <StyledView className="border-b border-r-red-50 ">
        <StyledText className="mr-2 text-lg">No. Hp :</StyledText>
        <TextInput
          value={no_hp}
          maxLength={12}
          style={{ height: 40, fontSize: 18 }}
          placeholder={extra?.no_hp}
          onChangeText={(no_hp) => setno_hp(no_hp)}
        />
      </StyledView>

      <StyledView className=" border-b border-r-red-50">
        <StyledText className="mr-2 text-lg">Alamat :</StyledText>
        <TextInput
          value={alamat}
          maxLength={50}
          style={{ height: 40, fontSize: 18 }}
          placeholder={extra?.alamat}
          onChangeText={(alamat) => setalamat(alamat)}
        />
      </StyledView>

      <StyledPressable
        className="bg-lime-500 px-8 py-2 rounded-lg mt-5 "
        onPress={create}
      >
        <StyledText className="text-center">Edit Profille</StyledText>
      </StyledPressable>
    </View>
  );
};

export default EditProfileScreen;

function msg() {
  throw new Error("Function not implemented.");
}
