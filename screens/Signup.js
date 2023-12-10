import React, { useState } from "react";
import {
  Alert, StyleSheet, Image, Text,
  Button, TextInput, View, SafeAreaView
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import { TouchableOpacity } from "react-native-gesture-handler";
const backImage = require("../assets/background.jpg");

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSignup = async () => {
    if (email !== "" && password !== "") {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Đăng ký thành công!"))
        .catch((error) => Alert.alert("Đăng ký thất bại", error.message));
    }
    else return;
  };

  return (
    <View stlye={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>Signup</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Mật khẩu"
          onChangeText={(password) => setPassword(password)}
          value={password}
          secureTextEntry={true}
        />
        <Button title="Đăng ký" onPress={onHandleSignup} />
        <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
          <Text style={{ color: "black" }}>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} >
            <Text style={{ color: "black", fontWeight: "bold" }}> Đăng Nhập</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    marginTop: 30,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "gray",
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
    width: 200,
    height: 40,
    backgroundColor: "#00B14F",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
