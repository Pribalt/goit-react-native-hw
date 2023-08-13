import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
      console.log("posts", posts);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <View style={styles.userAvatar}>
          <Image
            style={styles.avatar}
            source={require("..//..//assets/images/avatar.png")}
          />
        </View>
        <View style={styles.userDate}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ width: "100%", height: 240 }}
            />
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
  },
});

export default PostsScreen;
