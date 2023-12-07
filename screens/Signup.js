import React from "react";
import { Alert, StyleSheet, Image, Text, Button, TextInput, View, SafeAreaView } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import { TouchableOpacity } from "react-native-gesture-handler";
const backImage = require("../assets/background.jpg");
export default function Signup({navigation}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onHandleSignup = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Đăng nhập thành công!"))
        .catch((error) => Alert.alert("Đăng nhập thất bại", error.message));
    }
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
          <TouchableOpacity  onPress={() => navigation.navigate("Login")} >
            <Text style={{ color: "black", fontWeight: "bold" }}> Đăng Nhập</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
