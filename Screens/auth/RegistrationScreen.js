import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Image,
} from "react-native";

const initialUser = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [user, setUser] = useState(initialUser);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowAvatar, setIsShowAvatar] = useState(null);

  const navigation = useNavigation();

  const handelAddAvatar = () => {
    setIsShowAvatar(true);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleBtnRegister = () => {
    setIsShowKeyboard(false);
    setIsShowAvatar(false);
    Keyboard.dismiss();
    console.log(user);
    setUser(initialUser);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={
            isShowKeyboard
              ? { ...styles.imageBg, marginBottom: 50 }
              : styles.imageBg
          }
          source={require("../../assets/images/photo-bg.jpg")}
          resizeMode={"cover"}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.wrapAvatar}>
              {isShowAvatar && (
                <Image source={require("../../assets/images/avatar.png")} />
              )}

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btnAvatar}
                onPress={handelAddAvatar}
              >
                {isShowAvatar ? (
                  <Image source={require("../../assets/images/close.png")} />
                ) : (
                  <Image source={require("../../assets/images/add.png")} />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <Text style={styles.formTitle}>Registration</Text>
              <TextInput
                value={user.login}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, login: value }))
                }
                style={{ ...styles.input, marginBottom: 16 }}
                placeholder="Login"
                placeholderTextColor={"#BDBDBD"}
                onFocus={() => setIsShowKeyboard(true)}
              />
              <TextInput
                value={user.email}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, email: value }))
                }
                style={{ ...styles.input, marginBottom: 16 }}
                placeholder="Email address"
                placeholderTextColor={"#BDBDBD"}
                onFocus={() => setIsShowKeyboard(true)}
              />
              <View>
                <TextInput
                  value={user.password}
                  onChangeText={(value) =>
                    setUser((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  style={{ ...styles.input, marginBottom: 43 }}
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.btnShowPassword}
                >
                  {user.password ? (
                    <Text style={styles.btnShowPasswordTitle}>Show</Text>
                  ) : (
                    false
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btnRegister}
                onPress={handleBtnRegister}
              >
                <Text style={styles.btnRegisterTitle}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.linkText}>
                  Already have an account?{" "}
                  <Text
                    style={{
                      textDecorationLine: "underline",
                    }}
                  >
                    Sign in
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBg: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    flex: 1,
    justifyContent: "flex-end",
  },
  wrapAvatar: {
    position: "relative",
    top: 60,
    left: "50%",
    transform: [{ translateX: -60 }],
    zIndex: 1,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btnAvatar: {
    position: "absolute",
    top: 81,
    left: 107,
    zIndex: 10,
  },
  form: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 78,
    backgroundColor: "#fff",
  },
  formTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 33,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  btnShowPassword: {
    position: "absolute",
    top: 16,
    left: 305,
  },
  btnShowPasswordTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btnRegister: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  btnRegisterTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },

  linkText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "center",
  },
});
