import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

export default function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/images/photo-bg.jpg")}
      >
        <View style={styles.form}>
          <Text style={styles.formTitle}>Registration</Text>
          <TextInput style={styles.input} placeholder="Login" />
          <TextInput style={styles.input} placeholder="Email address" />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
            <Text style={styles.btnTitle}>Register</Text>
          </TouchableOpacity>
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
    marginHorizontal: 16,
  },
  formTitle: {
    textAlign: "center",
    fontSize: 30,
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
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 50,
    marginTop: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
