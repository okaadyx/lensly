import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const WelcomeScreen = () => {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.imageWrapper}>
        <Image
          source={require("@/assets/images/banner.png")}
          style={styles.bgImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.overlay} />

      <Animated.View entering={FadeInUp.duration(600)} style={{ flex: 1 }}>
        <View style={styles.content}>
          <Pressable
            onPress={() => router.push("/auth/login")}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  imageWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },

  bgImage: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 60,
  },

  button: {
    paddingVertical: 16,
    paddingHorizontal: 85,
    borderRadius: 24,

    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",

    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },

  buttonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
