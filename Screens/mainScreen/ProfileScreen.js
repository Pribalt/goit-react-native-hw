import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "..//..//firebase/config";

const ProfileScreen = () => {
  const { userId } = useSelector((state) => state.auth);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const postsCollection = collection(db, "posts");
    const userPostsQuery = query(
      postsCollection,
      where("userId", "==", userId)
    );
    const unsubscribe = await onSnapshot(userPostsQuery, (data) => {
      const updatedPosts = data.docs.map((doc) => ({
        ...doc.data(),
      }));
      setUserPosts(updatedPosts);
    });

    return () => unsubscribe();
  };

  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <View style={styles.userAvatar}>
          <Image
            style={styles.avatar}
            source={require("..//..//assets/images/avatar.png")}
          />
        </View>
        <View>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={userPosts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 32 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ width: "100%", height: 240 }}
            />
            <Text style={styles.labelImage}>{item.name}</Text>

            <View
              style={{
                flex: 0,
                flexDirection: "row",
                alignItems: "space-between",
                height: 24,
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btnComments}
                onPress={() => {
                  navigation.navigate("Comments", { postId: item.id });
                }}
              >
                <Feather
                  name="message-circle"
                  size={24}
                  color="#BDBDBD"
                  style={{
                    transform: [{ scaleX: -1 }],
                  }}
                />
                <Text style={styles.commentsCount}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btnLocation}
                onPress={() => {
                  navigation.navigate("Map", { location: item.location });
                }}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.labelLocation}>{item.locationAdrress}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#ffffff",
  },

  userWrap: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },

  userAvatar: {
    marginRight: 8,
  },

  avatar: {
    width: 60,
    height: 60,
  },

  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },

  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121",
  },

  labelImage: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginTop: 8,
  },

  btnComments: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },

  commentsCount: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 6,
  },

  btnLocation: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  labelLocation: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
    marginLeft: 4,
  },
});

export default ProfileScreen;
