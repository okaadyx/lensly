import { userApi } from "@/services/UserService";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import * as IntentLauncher from "expo-intent-launcher";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import React, { useRef } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import SetWallpaperBottomSheet from "./setWallpaper";

const { width, height } = Dimensions.get("window");

type WallpaperType = "lock" | "home" | "both";

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
  const sheetRef = useRef<any>(null);

  const closeViewer = () => {
    sheetRef.current?.snapToIndex(-1);
    setIsVisible(false);
  };

  const handleSetWallpaper = async (type: WallpaperType) => {
    if (Platform.OS !== "android") {
      Alert.alert(
        "Not Supported",
        "Wallpaper setting is only available on Android."
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
          "Please allow media access to set the wallpaper."
        );
        return;
      }

      // Convert file:// URI to content:// URI using FileSystem
      // This is required for Android 7+ to avoid FileUriExposedException
      const contentUri = await FileSystem.getContentUriAsync(fileUri);

      // Verify we have a content:// URI
      if (!contentUri.startsWith("content://")) {
        throw new Error("Failed to get content URI");
      }

      // Use ACTION_ATTACH_DATA to open the system wallpaper picker
      // FLAG_GRANT_READ_URI_PERMISSION (1) | FLAG_ACTIVITY_NEW_TASK (0x10000000)
      // This grants read permission to the receiving app
      const flags = 1 | 0x10000000;

      try {
        await IntentLauncher.startActivityAsync(
          "android.intent.action.ATTACH_DATA",
          {
            data: contentUri,
            type: "image/*",
            flags: flags,
          }
        );
      } catch (intentError: any) {
        console.error("Intent error:", intentError);
        Alert.alert(
          "Error",
          "Failed to open wallpaper picker. Please set the wallpaper manually from your gallery."
        );
      }
    } catch (error) {
      console.error("Error setting wallpaper:", error);
      Alert.alert("Error", "Failed to set wallpaper. Please try again.");
    }
  };

  const onWishlist = async (data: any) => {
    try {
      const response = await userApi.wishlist.addItem(data);

      if (response?.status === "success") {
        Alert.alert(
          "Added to wishlist",
          "Your image successfully added to the wishlist"
        );
        return;
      }

      Alert.alert(
        "Something Went Wrong",
        "Something went wrong please try again"
      );
    } catch (error) {
      Alert.alert("Error", "Unable to add item to wishlist : ");
    }
  };

  const onSharing = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert("Sharing", "Sharing is not available");
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
        "Please allow media access to save the image."
      );
      return;
    }

    const fileUri =
      FileSystem.documentDirectory + `wallpaper-${Date.now()}.jpg`;

    await FileSystem.downloadAsync(url, fileUri);
    await MediaLibrary.saveToLibraryAsync(fileUri);

    Alert.alert("Saved", "Image saved to gallery");
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={closeViewer}
    >
      <View style={styles.modalContainer}>
        <Pressable style={styles.overlay} onPress={closeViewer}>
          <Pressable style={styles.content}>
            <View style={styles.topBar}>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={closeViewer}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            <Image
              source={{ uri: url }}
              style={styles.image}
              resizeMode="contain"
            />

            <View style={styles.bottomBar}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => onWishlist({ imageId: imageId, imageUrl: url })}
              >
                <MaterialIcons name="favorite" size={26} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionBtn} onPress={onDownload}>
                <MaterialIcons name="file-download" size={26} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionBtn} onPress={onSharing}>
                <Ionicons name="share-social" size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => {
                  if (sheetRef.current) {
                    sheetRef.current.snapToIndex(0);
                  }
                }}
              >
                <Ionicons name="image" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>

        <SetWallpaperBottomSheet
          sheetRef={sheetRef}
          onSelect={handleSetWallpaper}
          onClose={() => {
            // Optional: handle any cleanup when sheet closes
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  topBar: {
    position: "absolute",
    top: -50,
    width: width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    zIndex: 10,
  },
  image: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 16,
  },
  bottomBar: {
    flexDirection: "row",
    marginTop: 20,
    gap: 30,
  },
  actionBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
