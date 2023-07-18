import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function RegistrationScreen() {
  return (
    <View>
      <TextInput style={styles.input} />
      <Text>Registration</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
