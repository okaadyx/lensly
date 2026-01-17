import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SearchHeader } from "./SearchHeader";

const HeaderComponent = () => {
  const handleSearchPress = () => {
    router.push("/(home)/search?autoFocus=true");
  };
  return (
    <View
      style={{
        padding: 8,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={require("@/assets/images/app-icon.png")}
        style={{ height: 60, width: 50, borderRadius: 50 }}
      />
      <SearchHeader />
      <TouchableOpacity onPress={() => router.push("/(home)/account")}>
        <Ionicons name="person-circle-outline" size={40} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  container: {
    height: 40,
    width: "70%",
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    color: "black",
    backgroundColor: "white",
  },
});
