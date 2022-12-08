import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "@config/firebase";
import { Pressable } from "react-native";
import { useState } from "react";

const PlaceholderImage = require("@assets/splash.png");

const auth = getAuth(app);

export default function SignInScreen({}) {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  const signIn = async () => {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
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

  return (
    <View style={styles.container}>
      <Text>Signin screen!</Text>

      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <TextInput
          placeholder="Email"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />

        <TextInput
          placeholder="Password"
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
        />

        <Pressable
          onPress={signIn}
          style={{
            width: "100%",
            backgroundColor: 'red',
            padding: 20,
          }}
        >
          <Text>Masuk</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#121212",
  },

  controls: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: 80,
    marginHorizontal: 20,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});
