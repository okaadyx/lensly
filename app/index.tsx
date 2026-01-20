import { userApi } from "@/services/UserService";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function StartupScreen() {
  useEffect(() => {
    const checkLogin = async () => {
      const token = await SecureStore.getItemAsync("token");
      try {
        if (!token) {
          await SecureStore.deleteItemAsync("token");
          router.replace("/(auth)/welcome");
        }
        const res = await userApi.user.getUser();

        if (res.user) {
          router.replace("/(home)");
        } else {
          await SecureStore.deleteItemAsync("token");
          router.replace("/(auth)/welcome");
        }
      } catch (error) {
        console.log("Error checking login:", error);
        router.replace("/(auth)/welcome");
      }
    };
    checkLogin();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <ActivityIndicator size="large" color="#ca7cd8" />
      <Text style={{ color: "white", marginTop: 10 }}>Loading...</Text>
    </View>
  );
}
