import { MenuItem } from "@/constants/menu";
import { userApi } from "@/services/UserService";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const colors = {
    background: isDark ? "#000" : "#fff",
    text: isDark ? "#fff" : "#000",
    subText: isDark ? "#aaa" : "#555",
    card: isDark ? "#111" : "#cadfee",
    accent: "#1d6ca7",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => userApi.user.getUser(),
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.profileContainer}>
        <View>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop",
            }}
          />
          <TouchableOpacity
            style={[styles.editIcon, { backgroundColor: colors.accent }]}
            onPress={() =>
              Alert.alert(
                "Screen not implemented",
                "Wait for next update to use this feature"
              )
            }
          >
            <Ionicons name="create" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.name, { color: colors.text }]}>
          {data?.user.name}
        </Text>

        <View style={[styles.emailBadge, { backgroundColor: colors.card }]}>
          <Text style={{ color: colors.subText }}>{data?.user.email}</Text>
        </View>
      </View>

      {/* Menu Section */}
      <View style={styles.menuContainer}>
        <MenuItem
          icon="pencil-outline"
          label="Edit Profile"
          onPress={() =>
            Alert.alert(
              "Screen not implemented",
              "Wait for next update to use this feature"
            )
          }
        />
        {/* <MenuItem
          icon="lock-closed-outline"
          label="Add Pin"
          onPress={() =>
            Alert.alert(
              "Screen not implemented",
              "Wait for next update to use this feature"
            )
          }
        /> */}
        <MenuItem
          icon="heart-outline"
          label="Wishlist"
          onPress={() =>
            Alert.alert(
              "Screen not implemented",
              "Wait for next update to use this feature"
            )
          }
        />
        <MenuItem
          icon="settings-outline"
          label="Settings"
          onPress={() =>
            Alert.alert(
              "Screen not implemented",
              "Wait for next update to use this feature"
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  avatar: {
    height: 120,
    width: 120,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 60,
  },
  editIcon: {
    position: "absolute",
    right: -5,
    bottom: -5,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  emailBadge: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    flex: 1,
  },
});
