import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function SearchHeader() {
  const handleSearchPress = () => {
    router.push("/(home)/search?autoFocus=true");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSearchPress}>
      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={18}
          color="#6B7280"
          style={styles.icon}
        />
        <Text style={styles.placeholder} numberOfLines={1} ellipsizeMode="tail">
          Search Images
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    minWidth: 200,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  placeholder: {
    fontSize: 13,
    color: "#6B7280",
    flex: 1,
  },
});
