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
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "..//..//redux/auth/authOperations";

const initialUser = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [user, setUser] = useState(initialUser);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleBtnSignIn = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(user));
    setUser(initialUser);
  };

  const handleBtnShowPassword = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={
            isShowKeyboard
              ? { ...styles.imageBg, marginBottom: 20 }
              : styles.imageBg
          }
          source={require("../../assets/images/photo-bg.jpg")}
          resizeMode={"cover"}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.form}>
              <Text style={styles.formTitle}>Sign in</Text>
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
                  secureTextEntry={isShowPassword}
                  placeholder="Password"
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.btnShowPassword}
                  onPress={handleBtnShowPassword}
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
                style={styles.btnSignIn}
                onPress={handleBtnSignIn}
              >
                <Text style={styles.btnSignInTitle}>Sign in</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.linkText}>
                  Don't have an account?{" "}
                  <Text
                    style={{
                      textDecorationLine: "underline",
                    }}
                  >
                    Sign up
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
  form: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 144,
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
  btnSignIn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  btnSignInTitle: {
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
