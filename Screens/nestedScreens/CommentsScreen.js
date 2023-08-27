import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "..//..//firebase/config";
import { currentDate } from "..//..//helpers/currentDate";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { postId } = route.params;
  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const creatPost = async () => {
    const documentRef = doc(db, "posts", postId);
    await addDoc(collection(documentRef, "comments"), {
      comment,
      login,
      date: currentDate(),
    });
  };

  const getAllPosts = async () => {
    const documentRef = doc(db, "posts", postId);
    const unsubscribe = await onSnapshot(
      collection(documentRef, "comments"),
      (data) => {
        const updatedComments = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAllComments(updatedComments);
      }
    );
    return () => unsubscribe();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentWrap}>
              <View style={styles.avatarContainer}></View>
              <View style={styles.commentContainer}>
                <Text style={styles.commentText}>{item.comment}</Text>
                <Text style={styles.commentDate}>{item.date}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View>
        <TextInput
          value={comment}
          onChangeText={(value) => setComment(value)}
          style={{ ...styles.input, paddingLeft: 16 }}
          placeholder="Comment..."
          placeholderTextColor={"#BDBDBD"}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnComment}
          onPress={creatPost}
        >
          <Image
            source={require("..//..//assets/images/arrow-up.png")}
            style={{ width: 10, height: 14 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    //  paddingTop: 32,
    //  paddingBottom: 16,
  },

  commentContainer: {
    borderRadius: 6,
    backgroundColor: "#F7F7F7",
    padding: 16,
    marginBottom: 24,
  },

  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    textAlign: "left",
  },

  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    marginTop: 8,
    textAlign: "left",
  },

  input: {
    position: "relative",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    minHeight: 50,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
  },

  btnComment: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommentsScreen;
