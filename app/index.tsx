import { userApi } from "@/services/UserService";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function StartupScreen() {
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");

        if (!token) {
          await SecureStore.deleteItemAsync("token");
          router.replace("/auth/welcome");
          return;
        }

        const res = await userApi.user.getUser();

        if (res.user) {
          router.replace("/home");
        } else {
          await SecureStore.deleteItemAsync("token");
          router.replace("/auth/welcome");
        }
      } catch (error) {
        console.log("Error checking login:", error);
        router.replace("/auth/welcome");
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require("@/assets/images/background.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.bottomLoader}>
          <ActivityIndicator size="small" color="#ca7cd8" />
          <Text style={styles.loadingText}>Checking for updates...</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomLoader: {
    alignItems: "center",
    paddingBottom: 40,
  },
  loadingText: {
    color: "white",
    marginTop: 8,
    fontSize: 14,
    opacity: 0.9,
  },
});
