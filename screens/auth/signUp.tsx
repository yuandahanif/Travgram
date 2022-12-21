import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app, { db } from "@config/firebase";
import { Pressable } from "react-native";
import { useState } from "react";
import { COLORS } from "@config/constant";
import { StackScreenProps } from "@react-navigation/stack";

import textStyle from "@styles/text.style";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyledPressable,
  StyledSafeAreaView,
  StyledText,
  StyledView,
} from "@components/styled";
import { doc, setDoc } from "firebase/firestore";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const auth = getAuth(app);

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email dan Password Harus Di isi.",
      });
      return;
    }
    setIsLoading(true);

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );

      const data = {
        nama: user?.user.uid,
        nama_pengguna: "Masukkan nama pengguna",
        no_hp: "Masukkan nomer hp.",
        alamat: "Masukkan alamat.",
      };

      if (user) {
        setDoc(doc(db, "pengguna", user?.user.uid), data)
          .then(() => {
            navigation.navigate("Sign In");
          })
          .catch((error) => {
            Toast.show({
              type: "error",
              text1: "Bermasalah bro!",
              text2: "Hidupmu bermasalah.",
            });
            console.log(error);
          });
      } else {
        alert("ERROR: uid tidak ada");
      }
    } catch (error: any) {
      setValue({
        ...value,
        error: error?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toSignInScreen = () => {
    navigation.navigate("Sign In");
  };

  return (
    <StyledSafeAreaView className="flex-1">
      <StyledView className="absolute w-full mx-auto px-3 bottom-24 justify-center">
        <StyledText className="text-6xl text-center font-bold text-cyan-400">
          Travgram
        </StyledText>
        <StyledText className="mb-40 text-xl text-center font-bold text-black">
          Daftar
        </StyledText>

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={value.email}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />

            <TextInput
              placeholder="Password"
              style={styles.input}
              value={value.password}
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={true}
            />

            <StyledPressable
              className="bg-cyan-400 p-3 rounded-full"
              onPress={signIn}
            >
              <Text style={styles.buttonText}>Daftar</Text>
            </StyledPressable>

            <View style={styles.changeScreenText}>
              <Text style={textStyle.textMain}>Sudah Punya Akun?</Text>
              <StyledPressable onPress={toSignInScreen}>
                <Text style={textStyle.textBlue}> Masuk</Text>
              </StyledPressable>
            </View>

            {!!value.error && (
              <View style={styles.error}>
                <Text>{value.error}</Text>
              </View>
            )}
          </>
        )}
      </StyledView>
    </StyledSafeAreaView>
  );
};
export default SignUpScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#121212",
  },
  textTitle: {
    marginBottom: 200,
    color: COLORS["white"],
    fontSize: 60,
    fontWeight: "700",
    textAlign: "center",
  },

  controls: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: 100,
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: "white",
    color: 'black',
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
  },

  error: {
    marginTop: 40,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },

  button: {
    width: "100%",
    backgroundColor: COLORS["green-main"],
    padding: 10,
    borderRadius: 16,
  },

  buttonText: {
    color: COLORS["white"],
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },

  changeScreenText: {
    color: COLORS.white,
    flexDirection: "row",
    marginTop: 10,
  },
});
