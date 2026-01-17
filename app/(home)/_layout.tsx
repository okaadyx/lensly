// import { Tabs } from "expo-router";
// import React from "react";

// import { HapticTab } from "@/components/haptic-tab";
// import { Colors } from "@/constants/theme";
// import { useColorScheme } from "@/hooks/use-color-scheme";
// import { Ionicons } from "@expo/vector-icons";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="account"
//         options={{
//           title: "Account",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="person-circle-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
import HeaderComponent from "@/components/header/HeaderComponent";
import SearchComponent from "@/components/header/SearchComponent";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{ headerTitle: () => <HeaderComponent /> }}
      />
      <Stack.Screen name="account" options={{ title: "Account" }} />
      <Stack.Screen
        name="search"
        options={{
          headerTitle: () => <SearchComponent />,
        }}
      />
    </Stack>
  );
}
