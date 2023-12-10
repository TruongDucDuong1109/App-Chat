import React from "react";
import { Alert, StyleSheet, Image, Text, Button, TextInput, View, SafeAreaView } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config";
import { TouchableOpacity } from "react-native-gesture-handler";
const backImage = require("../assets/background.jpg");
export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Đăng nhập thành công!"))
        .catch((error) => Alert.alert("Đăng nhập thất bại", error.message));
    }
  };
  return (
    <View stlye={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>Đăng nhập</Text>
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
        <Button title="Đăng nhập" onPress={onHandleLogin} />
        <View style={styles.notAccountYet}>
          <Text style={{ color: "black" }}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")} >
            <Text style={{ color: "black", fontWeight: "bold" }}> Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    marginTop: 50,
  },
  textInput: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 10,
  },
  button: {
    height: 50,
    width: 300,
    backgroundColor: "blue",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  notAccountYet: {
    flexDirection: "row",
    marginTop: 20,
  },
});
