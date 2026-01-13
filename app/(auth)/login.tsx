import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
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
        placeholder="Email"
        placeholderTextColor={isDark ? "#777" : "#999"}
        keyboardType="email-address"
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#111" : "#f7f7f7",
            color: isDark ? "#fff" : "#000",
          },
        ]}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={isDark ? "#777" : "#999"}
        secureTextEntry
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#111" : "#f7f7f7",
            color: isDark ? "#fff" : "#000",
          },
        ]}
      />

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
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
    backgroundColor: "#fff",
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
    color: "#777",
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
  button: {
    backgroundColor: "#1E88E5",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
  linkBold: {
    color: "#1E88E5",
    fontWeight: "600",
  },
});
