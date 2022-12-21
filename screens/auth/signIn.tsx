import { Text, TextInput, View } from "react-native";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "@config/firebase";
import { Pressable } from "react-native";
import { useState } from "react";
import { styles } from "@screens/auth/signUp";
import { StackScreenProps } from "@react-navigation/stack";
import textStyle from "@styles/text.style";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyledPressable,
  StyledSafeAreaView,
  StyledText,
  StyledView,
} from "@components/styled";

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
    <StyledSafeAreaView className="flex-1">
      <StyledView className="absolute w-full mx-auto px-3 bottom-24 justify-center">
        <StyledText className="text-6xl text-center font-bold text-cyan-400">
          Travgram
        </StyledText>
        <StyledText className="mb-40 text-xl text-center font-bold text-black">
          Masuk
        </StyledText>

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
          <Text style={styles.buttonText}>Masuk</Text>
        </StyledPressable>

        <View style={styles.changeScreenText}>
          <Text style={textStyle.textMain}>Belum Punya Akun?</Text>
          <Pressable onPress={toSignInScreen}>
            <Text style={textStyle.textBlue}> Daftar</Text>
          </Pressable>
        </View>

        {!!value.error && (
          <View style={styles.error}>
            <Text>{value.error}</Text>
          </View>
        )}
      </StyledView>
    </StyledSafeAreaView>
  );
}
