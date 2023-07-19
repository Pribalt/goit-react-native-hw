import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/images/photo-bg.jpg")}
      >
        <View style={styles.form}>
          <Text style={styles.formTitle}>Sign in</Text>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor={"#BDBDBD"}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor={"#BDBDBD"}
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
            <Text style={styles.btnTitle}>Sign in</Text>
          </TouchableOpacity>
          <Text style={styles.linkText}>Don't have an account? Sign up</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 144,
    backgroundColor: "#fff",
  },
  formTitle: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 33,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    height: 50,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 50,
    marginTop: 27,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
  linkText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
