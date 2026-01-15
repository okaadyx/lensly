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

export default function LoginScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    try {
      if (!email.trim() || !password.trim()) {
        Alert.alert(
          "Missing Information",
          "Please enter both email and password."
        );
        return;
      }

      setLoading(true);

      const response = await userApi.user.login({ email, password });

      if (response?.token) {
        router.replace("/(tabs)");
      } else {
        Alert.alert(
          "Login Failed",
          response?.message || "Invalid email or password"
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
        Welcome Back 👋
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>
        Login to your account
      </Text>

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

      {/* Password Input with Eye Icon */}
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
        onPress={handleLogin}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </Pressable>

      <Pressable onPress={() => router.push("/(auth)/signup")}>
        <Text style={[styles.link, { color: isDark ? "#aaa" : "#555" }]}>
          Don’t have an account? <Text style={styles.linkBold}>Sign up</Text>
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
