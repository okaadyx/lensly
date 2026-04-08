import { userApi } from "@/services/UserService";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import * as IntentLauncher from "expo-intent-launcher";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

import { queryClient } from "@/lib/QueryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import ImageViewing from "react-native-image-viewing";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "../core/Toast";

type WallpaperType = "lock" | "home" | "both";

const lightTheme = {
  overlay: "rgba(255,255,255,0.75)",
  actionBtnBg: "rgba(0,0,0,0.08)",
  icon: "#000",
};

const darkTheme = {
  overlay: "rgba(0,0,0,0.45)",
  actionBtnBg: "rgba(255,255,255,0.15)",
  icon: "#fff",
};

export default function ImageViewer({
  isVisible,
  setIsVisible,
  imageId,
  url,
}: {
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
  url: string;
  imageId: string;
}) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const [liked, setLiked] = useState<boolean>(false);
  const { data } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => userApi.wishlist.getWishlist(),
  });

  const existInWishlist = useMemo(
    () => data?.wishlist?.images?.some((item: any) => item.imageId === imageId),
    [data, imageId],
  );

  useEffect(() => {
    if (existInWishlist !== undefined) {
      setLiked(existInWishlist);
    }
  }, [existInWishlist]);

  const handleSetWallpaper = async (type?: WallpaperType) => {
    if (Platform.OS !== "android") {
      Alert.alert(
        "Not Supported",
        "Wallpaper setting is only available on Android.",
      );
      return;
    }

    try {
      const fileUri = FileSystem.cacheDirectory + `wallpaper-${Date.now()}.jpg`;

      await FileSystem.downloadAsync(url, fileUri);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow media access to set the wallpaper.",
        );
        return;
      }

      const contentUri = await FileSystem.getContentUriAsync(fileUri);

      const flags = 1 | 0x10000000;

      await IntentLauncher.startActivityAsync(
        "android.intent.action.ATTACH_DATA",
        {
          data: contentUri,
          type: "image/*",
          flags,
        },
      );
    } catch (error) {
      Alert.alert("Error", "Failed to set wallpaper.");
    }
  };

  const wishlistMutation = useMutation({
    mutationFn: async ({ type }: { type: "add" | "remove" }) => {
      if (type === "add") {
        return userApi.wishlist.addItem({
          imageId,
          imageUrl: url,
        });
      } else {
        return userApi.wishlist.removeItem(imageId);
      }
    },

    // OPTIMISTIC UPDATE
    onMutate: async ({ type }) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previousData = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old: any) => {
        if (!old) return old;

        let updatedImages = [...old.wishlist.images];

        if (type === "add") {
          updatedImages.push({ imageId, imageUrl: url });
        } else {
          updatedImages = updatedImages.filter(
            (item: any) => item.imageId !== imageId,
          );
        }

        return {
          ...old,
          wishlist: {
            ...old.wishlist,
            images: updatedImages,
          },
        };
      });

      // update local UI instantly
      setLiked(type === "add");

      return { previousData };
    },

    // Rollback if failed
    onError: (err, variables, context) => {
      queryClient.setQueryData(["wishlist"], context?.previousData);
      setLiked(!(variables.type === "add")); // revert UI
      Alert.alert("Error", "Something went wrong");
    },

    // Sync with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const onSharing = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert("Sharing", "Sharing not available");
        return;
      }

      const fileUri = FileSystem.cacheDirectory + `image-${Date.now()}.jpg`;
      await FileSystem.downloadAsync(url, fileUri);
      await Sharing.shareAsync(fileUri);
    } catch {
      Alert.alert("Error", "Failed to share image");
    }
  };

  const onDownload = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow media access to save the image.",
      );
      return;
    }

    const fileUri = FileSystem.documentDirectory + `image-${Date.now()}.jpg`;

    await FileSystem.downloadAsync(url, fileUri);
    await MediaLibrary.saveToLibraryAsync(fileUri);
    Toast("Image Saved to Gallery");
  };

  return (
    <SafeAreaView>
      <ImageViewing
        images={[{ uri: url }]}
        visible={isVisible}
        imageIndex={0}
        HeaderComponent={() => null}
        onRequestClose={() => setIsVisible(false)}
        FooterComponent={() => (
          <View style={styles.footerWrapper}>
            <View
              style={[styles.actionBar, { backgroundColor: theme.overlay }]}
            >
              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  { backgroundColor: theme.actionBtnBg },
                ]}
                disabled={wishlistMutation.isPending}
                onPress={() => {
                  wishlistMutation.mutate({
                    type: liked ? "remove" : "add",
                  });
                }}
              >
                <MaterialIcons
                  name="favorite"
                  size={26}
                  color={liked ? "red" : theme.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  { backgroundColor: theme.actionBtnBg },
                ]}
                onPress={onDownload}
              >
                <MaterialIcons
                  name="file-download"
                  size={26}
                  color={theme.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  { backgroundColor: theme.actionBtnBg },
                ]}
                onPress={onSharing}
              >
                <Ionicons name="share-social" size={24} color={theme.icon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  { backgroundColor: theme.actionBtnBg },
                ]}
                onPress={() => handleSetWallpaper()}
              >
                <Ionicons name="image" size={24} color={theme.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footerWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },

  actionBar: {
    flexDirection: "row",
    gap: 26,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginBottom: 24,
  },

  actionBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
