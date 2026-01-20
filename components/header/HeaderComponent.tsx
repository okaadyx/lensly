import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, useColorScheme, View } from "react-native";
import { SearchHeader } from "./SearchHeader";

const HeaderComponent = () => {
  const scheme = useColorScheme();
  return (
    <View
      style={{
        // padding: 8,
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
        <Ionicons
          name="person-circle-outline"
          size={40}
          color={scheme === "dark" ? "#ffff" : "#a8a8a8"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
