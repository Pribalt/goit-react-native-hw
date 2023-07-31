import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native";
import PostsScreen from ".//PostsScreen";
import CreatePostsScreen from ".//CreatePostsScreen";
import ProfileScreen from ".//ProfileScreen";

const Home = () => {
  const MainTab = createBottomTabNavigator();
  //   const navigation = useNavigation();

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        tabBarActiveBackgroundColor: "#FFFFFF",
        tabBarStyle: { height: 88 },
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="grid" size={24} color="#212121" />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="add"
              size={24}
              color={focused ? "#FFFFFF" : "#BDBDBD"}
            />
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={24} color="#212121" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default Home;
