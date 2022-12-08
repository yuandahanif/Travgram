import { StyleSheet, Text, TextInput, View } from "react-native";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "@config/firebase";
import { Pressable } from "react-native";
import { useState } from "react";
import { COLORS } from "@config/constant";
import { StackScreenProps } from "@react-navigation/stack";

const auth = getAuth(app);

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  const signIn = async () => {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email dan Password Harus Di isi.",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate("Sign In");
    } catch (error: any) {
      setValue({
        ...value,
        error: error?.message,
      });
    }
  };

  const toSignInScreen = () => {
    navigation.navigate("Sign In");
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Text style={[styles.textTitle, { marginBottom: 10 }]}>Travgram</Text>
        <Text style={[styles.textTitle, { fontSize: 26, fontWeight: "400" }]}>
          Daftar
        </Text>

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

        <Pressable onPress={signIn} style={styles.button}>
          <Text style={styles.buttonText}>Daftar</Text>
        </Pressable>

        <View style={styles.changeScreenText}>
          <Text style={styles.textWhite}>Sudah Punya Akun?</Text>
          <Pressable onPress={toSignInScreen}>
            <Text style={styles.textBlue}> Masuk</Text>
          </Pressable>
        </View>

        {!!value.error && (
          <View style={styles.error}>
            <Text>{value.error}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default SignUpScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#121212",
  },
  textWhite: { color: COLORS.white },
  textBlue: { color: COLORS["blue-main"] },
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
    color: COLORS["white-o-25"],
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
  },

  error: {
    marginTop: 10,
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