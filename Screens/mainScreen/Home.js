import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import PostsScreen from ".//PostsScreen";
import CreatePostsScreen from ".//CreatePostsScreen";
import ProfileScreen from ".//ProfileScreen";
import { View } from "react-native";

const Home = () => {
  const MainTab = createBottomTabNavigator();
  const navigation = useNavigation();

  return (
    <MainTab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#FFFFFF",
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingBottom: 34,
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Login")}
            >
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
          headerStyle: styles.header,
          tabBarItemStyle: { flex: 0, width: 40, height: 40, marginLeft: 82 },
          tabBarIcon: ({ focused, color, size }) => (
            <View>
              <Feather name="grid" size={24} color="#212121" />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Posts")}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="#212121"
                style={{ marginLeft: 16 }}
              />
            </TouchableOpacity>
          ),
          headerStyle: styles.header,
          tabBarItemStyle: {
            flex: 0,
            width: 70,
            height: 40,
            marginLeft: 31,
            backgroundColor: "#FF6C00",
            borderRadius: 20,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <View>
              <Ionicons
                name="add"
                borderRadius={20}
                size={24}
                color="#FFFFFF"
              />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Login")}
            >
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
          headerStyle: styles.header,
          tabBarItemStyle: { flex: 0, width: 40, height: 40, marginLeft: 31 },
          tabBarIcon: ({ focused, color, size }) => (
            <View>
              <Feather name="user" size={24} color="#212121" />
            </View>
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 88,
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
  },
});

export default Home;
