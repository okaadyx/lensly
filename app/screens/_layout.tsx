import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="profile"
        options={{
          title: "Edit Profile",
        }}
      />
      <Stack.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
        }}
      />
    </Stack>
  );
}
