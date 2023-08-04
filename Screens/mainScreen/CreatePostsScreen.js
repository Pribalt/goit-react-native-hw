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
  };

  const removePhoto = async () => {
    setPhoto(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraThumb}>
        {photo ? (
          <ImageBackground source={{ uri: photo }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={removePhoto}
              style={styles.cameraBtn}
            >
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </ImageBackground>
        ) : (
          <Camera style={styles.camera} ref={setCamera}>
            <ImageBackground source={{ uri: photo }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={takePhoto}
                style={styles.cameraBtn}
              >
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </ImageBackground>
          </Camera>
        )}
      </View>
      <Text style={styles.cameraText}>
        {photo ? "Upload a photo" : "Edit photo"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },

  cameraThumb: {
    width: "100%",
    height: 240,
    overflow: "hidden",
    backgroundColor: "#F6F6F6",
    border: "1px solid #E8E8E8",
    borderRadius: 8,
    marginTop: 32,
  },

  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 30,
  },

  cameraText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,
  },
});

export default CreatePostsScreen;
