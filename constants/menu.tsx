import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

type MenuItemsProps = {
  icon: any;
  label: string;
  onPress: () => void;
};
export const MenuItem = ({ icon, label, onPress }: MenuItemsProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#EEE",
    }}
  >
    <Ionicons name={icon} size={22} color="#3A7CA5" />
    <Text style={{ flex: 1, marginLeft: 12, fontSize: 16, color: "#ffffff" }}>
      {label}
    </Text>
    <Ionicons name="chevron-forward-outline" size={22} color="#3A7CA5" />
  </TouchableOpacity>
);
