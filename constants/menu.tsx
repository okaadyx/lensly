import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, useColorScheme } from "react-native";

type MenuItemsProps = {
  icon: any;
  label: string;
  onPress: () => void;
};

export const MenuItem = ({ icon, label, onPress }: MenuItemsProps) => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const colors = {
    text: isDark ? "#fff" : "#000",
    border: isDark ? "#222" : "#EEE",
    icon: "#3A7CA5",
    chevron: "#3A7CA5",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <Ionicons name={icon} size={22} color={colors.icon} />

      <Text
        style={{
          flex: 1,
          marginLeft: 12,
          fontSize: 16,
          color: colors.text,
        }}
      >
        {label}
      </Text>

      <Ionicons
        name="chevron-forward-outline"
        size={22}
        color={colors.chevron}
      />
    </TouchableOpacity>
  );
};
