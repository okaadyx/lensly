import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function ProfileScreen() {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={styles.avatar}
          />

          <TouchableOpacity style={styles.cameraButton}>
            <Feather name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.changePhotoText}>Change Photo</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>FULL NAME</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value="Jane Cooper"
            // editable={false}
            placeholderTextColor={isDark ? "#aaa" : "#888"}
          />
          <Feather name="edit-2" size={16} color={isDark ? "#aaa" : "#888"} />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value="jane.cooper@example.com"
            // editable={false}
            placeholderTextColor={isDark ? "#aaa" : "#888"}
          />
          <Feather name="edit-2" size={16} color={isDark ? "#aaa" : "#888"} />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>LOCATION</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value="San Francisco, CA"
            // editable={false}
            placeholderTextColor={isDark ? "#aaa" : "#888"}
          />
          <Feather name="edit-2" size={16} color={isDark ? "#aaa" : "#888"} />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}
const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#000" : "#fff",
      padding: 24,
    },

    avatarWrapper: {
      alignItems: "center",
      marginTop: 20,
    },

    avatarContainer: {
      width: 110,
      height: 110,
      position: "relative",
    },

    avatar: {
      width: "100%",
      height: "100%",
      borderRadius: 55,
    },

    cameraButton: {
      position: "absolute",
      bottom: 4,
      right: 4,
      backgroundColor: "#000",
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },

    changePhotoText: {
      textAlign: "center",
      marginTop: 12,
      fontSize: 14,
      fontWeight: "500",
      color: isDark ? "#fff" : "#000",
    },

    inputGroup: {
      marginTop: 24,
    },

    label: {
      fontSize: 12,
      color: isDark ? "#aaa" : "#888",
      marginBottom: 6,
      fontWeight: "600",
    },

    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: isDark ? "#333" : "#e5e5e5",
      borderRadius: 8,
      paddingHorizontal: 12,
      height: 48,
      backgroundColor: isDark ? "#111" : "#fff",
    },

    input: {
      flex: 1,
      fontSize: 15,
      color: isDark ? "#fff" : "#000",
    },

    saveButton: {
      marginTop: "auto",
      backgroundColor: isDark ? "#fff" : "#000",
      height: 54,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },

    saveButtonText: {
      color: isDark ? "#000" : "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });
