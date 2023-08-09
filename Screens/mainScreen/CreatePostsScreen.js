import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const navigation = useNavigation();

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const handlePublish = () => {
    navigation.navigate("Posts", { photo, name, location });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrap}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                style={{ width: "100%", height: 240 }}
                source={{ uri: photo }}
              />
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={takePhoto}
            style={styles.cameraBtn}
          >
            <FontAwesome name="camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>
      </View>
      <Text style={styles.cameraText}>
        {photo ? "Edit photo" : "Upload a photo"}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePublish}
        style={styles.sendBtn}
      >
        <Text style={styles.sendTitle}>Publish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },

  cameraWrap: {
    width: "100%",
    height: 240,
    overflow: "hidden",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    marginTop: 32,
  },

  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  takePhotoContainer: {
    width: "100%",
    height: 240,
    position: "absolute",
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
