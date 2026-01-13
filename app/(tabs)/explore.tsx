import { MenuItem } from "@/constants/menu";
import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Image
          style={{
            height: 120,
            width: 120,
            borderRadius: 60,
          }}
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
        <View
          style={{
            height: 40,
            width: 40,
            marginLeft: 80,
            backgroundColor: "#1d6ca7",
            borderRadius: 40,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Screen not implemented",
                "wait for next update to use this feature"
              )
            }
          >
            <Ionicons name="create" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 20, color: "white" }}>john doe</Text>
        <View
          style={{
            height: 30,
            width: "40%",
            backgroundColor: "#cadfee",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
          }}
        >
          <Text>example@gmail.com</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <MenuItem
          icon="pencil-outline"
          label="Edit Profile"
          onPress={() =>
            Alert.alert(
              "Screen not implemented",
              "wait for next update to use this feature"
            )
          }
        />
        <MenuItem
          icon="lock-closed-outline"
          label="Add Pin"
          onPress={() =>
            Alert.alert(
              "Screen not implemented",
              "wait for next update to use this feature"
            )
          }
        />
        <MenuItem
          icon="settings-outline"
          label="Settings"
          onPress={() =>
            Alert.alert(
              "Screen not implemented",
              "wait for next update to use this feature"
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
