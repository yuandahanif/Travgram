import { Text, TextInput, View } from "react-native";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "@config/firebase";
import { Pressable } from "react-native";
import { useState } from "react";
import { styles } from "@screens/auth/signUp";
import { StackScreenProps } from "@react-navigation/stack";

const auth = getAuth(app);

export default function SignInScreen({ navigation }: StackScreenProps<any>) {
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
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error: any) {
      setValue({
        ...value,
        error: error?.message,
      });
    }
  };

  const toSignInScreen = () => {
    navigation.navigate("Sign Up");
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Text style={[styles.textTitle, { marginBottom: 10 }]}>Travgram</Text>
        <Text style={[styles.textTitle, { fontSize: 26, fontWeight: "400" }]}>
          Masuk
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
          <Text style={styles.buttonText}>Masuk</Text>
        </Pressable>

        <View style={styles.changeScreenText}>
          <Text style={styles.textWhite}>Belum Punya Akun?</Text>
          <Pressable onPress={toSignInScreen}>
            <Text style={styles.textBlue}> Daftar</Text>
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
}
