import React, { useState } from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        <View style={styles.takePhotoContainer}>
          <ImageBackground source={{ uri: photo }} />
        </View>
        <TouchableOpacity onPress={takePhoto} style={styles.cameraBtn}>
          <FontAwesome name="camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },

  camera: {
    width: "100%",
    height: 240,
    overflow: "hidden",
    backgroundColor: "#F6F6F6",
    border: "1px solid #E8E8E8",
    borderRadius: 8,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#ffffff",
    borderWidth: 1,
  },

  cameraBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 30,
  },
});

export default CreatePostsScreen;
