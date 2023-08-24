import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "..//..//firebase/config";

const CreatePostsScreen = () => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const [locationAdrress, setLocationAdrress] = useState("");

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const navigation = useNavigation();

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const handlePublish = () => {
    uploadPostToServer();
    navigation.navigate("Posts");
    deletePublish();
  };

  const deletePublish = () => {
    setPhoto(null);
    setComment("");
    setLocationAdrress("");
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);

    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const storageRef = ref(storage, `postImage/${uniquePostId}`);

    await uploadBytes(storageRef, file);

    const fetchPhotoRefStorage = await getDownloadURL(storageRef);

    return fetchPhotoRefStorage;
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      const result = await addDoc(collection(db, "posts"), {
        photo,
        comment,
        location,
        locationAdrress,
        userId,
        login,
      });
    } catch (error) {
      console.log(error.massage);
    }
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
        {photo ? "Edit photo" : "Upload photo"}
      </Text>

      <TextInput
        value={comment}
        onChangeText={(value) => setComment(value)}
        style={{ ...styles.input, marginTop: 32 }}
        placeholder="Name..."
        placeholderTextColor={"#BDBDBD"}
      />

      <View style={{ marginTop: 16 }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnLocation}
          onPress={() => navigation.navigate("Map", { location })}
        >
          <Feather name="map-pin" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <TextInput
          value={locationAdrress}
          onChangeText={(value) => setLocationAdrress(value)}
          style={{ ...styles.input, paddingLeft: 28 }}
          placeholder="Locality..."
          placeholderTextColor={"#BDBDBD"}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePublish}
        disabled={photo ? false : true}
        style={
          photo
            ? styles.sendBtn
            : { ...styles.sendBtn, backgroundColor: "#F6F6F6" }
        }
      >
        <Text
          style={
            photo ? styles.sendTitle : { ...styles.sendTitle, color: "#BDBDBD" }
          }
        >
          Publish
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={deletePublish}
        style={styles.wipeBtn}
      >
        <Feather name="trash-2" size={24} color="#BDBDBD" />
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

  btnLocation: {
    position: "absolute",
    zIndex: 100,
    top: 13,
    left: 0,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },

  sendBtn: {
    backgroundColor: "#FF6C00",
    height: 51,
    marginTop: 32,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  sendTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },

  wipeBtn: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 120,
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
