import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import { useNavigation } from "@react-navigation/native";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/mainScreen/Home";
import CommentsScreen from "./Screens/nestedScreens/CommentsScreen";
import MapScreen from "./Screens/nestedScreens/MapScreen";

const AuthStack = createStackNavigator();

// const navigation = useNavigation();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  } else {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen name="Map" component={MapScreen} />
        <AuthStack.Screen name="Comments" component={CommentsScreen} />
      </AuthStack.Navigator>
    );
  }
};
