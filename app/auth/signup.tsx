import { userApi } from "@/services/UserService";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import { z } from "zod";

export default function SignupScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const signupDetails = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Minimum 8 Characters"),
  });

  const handleSignup = async () => {
    if (loading) return;

    const result = signupDetails.safeParse({
      name,
      email,
      password,
    });
    if (!result.success) {
      const firstError = result.error.issues[0];
      Alert.alert("Validation Error", firstError?.message || "Invalid input");
      return;
    }
    try {
      setLoading(true);
      const response = await userApi.user.signup({ name, email, password });

      if (response?.token) {
        router.replace("/home");
      } else {
        Alert.alert(
          "Signup Failed",
          response?.message || "Failed to create account",
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
        Create Account
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>
        Join Lensly today
      </Text>

      <TextInput
        value={name}
        placeholder="Full Name"
        placeholderTextColor={isDark ? "#777" : "#999"}
        onChangeText={setName}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#111" : "#f7f7f7",
            color: isDark ? "#fff" : "#000",
          },
        ]}
      />

      <TextInput
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        placeholderTextColor={isDark ? "#777" : "#999"}
        onChangeText={setEmail}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#111" : "#f7f7f7",
            color: isDark ? "#fff" : "#000",
          },
        ]}
      />

      <View
        style={[
          styles.passwordContainer,
          {
            backgroundColor: isDark ? "#111" : "#f7f7f7",
            borderColor: "#ddd",
          },
        ]}
      >
        <TextInput
          value={password}
          placeholder="Password"
          secureTextEntry={!showPassword}
          textContentType="password"
          placeholderTextColor={isDark ? "#777" : "#999"}
          onChangeText={setPassword}
          style={[styles.passwordInput, { color: isDark ? "#fff" : "#000" }]}
        />

        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color={isDark ? "#aaa" : "#555"}
          />
        </Pressable>
      </View>

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignup}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text style={[styles.link, { color: isDark ? "#aaa" : "#555" }]}>
          Already have an account? <Text style={styles.linkBold}>Login</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1E88E5",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    textAlign: "center",
    marginTop: 20,
  },
  linkBold: {
    color: "#1E88E5",
    fontWeight: "600",
  },
});
