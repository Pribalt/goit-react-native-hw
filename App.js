import React, { useState, useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { useRoute } from ".//router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

export default function App() {
  const [user, setUser] = useState(null);
  auth.onAuthStateChanged((user) => setUser(user));

  const routing = useRoute(user);
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
