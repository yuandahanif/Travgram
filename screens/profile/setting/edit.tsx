import { StyledPressable, StyledText, StyledView } from "@components/styled";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
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
    if (user?.uid) {
      setDoc(doc(db, "pengguna", user?.uid), {
        nama: nama,
        nama_pengguna: nama_pengguna,
        no_hp: no_hp,
        alamat: alamat,
      })
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
          style={{ height: 40, fontSize: 18 }}
          placeholder={extra?.nama}
          onChangeText={(nama) => setnama(nama)}
        />
      </StyledView>

      <StyledView className="border-b border-r-red-500">
        <StyledText className="mr-2 text-lg">Nama Pengguna :</StyledText>
        <TextInput
          value={nama_pengguna}
          style={{ height: 40, fontSize: 18 }}
          placeholder={extra?.nama_pengguna}
          onChangeText={(nama_pengguna) => setnama_namapengguna(nama_pengguna)}
        />
      </StyledView>

      <StyledView className="border-b border-r-red-50 ">
        <StyledText className="mr-2 text-lg">No. Hp :</StyledText>
        <TextInput
          value={no_hp}
          style={{ height: 40, fontSize: 18 }}
          defaultValue={extra?.no_hp}
          onChangeText={(no_hp) => setno_hp(no_hp)}
        />
      </StyledView>

      <StyledView className=" border-b border-r-red-50">
        <StyledText className="mr-2 text-lg">Alamat :</StyledText>
        <TextInput
          value={alamat}
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
