import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Image
        source={{
          uri: "https://i.pinimg.com/736x/ba/bb/1d/babb1d61c7a46dfe88c832f0f649cae5.jpg",
        }}
        style={styles.bgImage}
        resizeMode="cover"
      />

      <Animated.View entering={FadeInUp.duration(500)} style={{ flex: 1 }}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>Lensly</Text>
          <Text style={styles.subText}>Every Pixel Tells a Story</Text>

          <Pressable
            onPress={() => router.push("/(auth)/login")}
            style={styles.startButton}
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
  },
  bgImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 20,
    paddingBottom: 50,
  },
  titleText: {
    color: "white",
    fontSize: 48,
    fontWeight: "600",
  },
  subText: {
    fontSize: 16,
    color: "white",
    letterSpacing: 1,
  },
  startButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 18,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
