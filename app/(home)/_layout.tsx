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
