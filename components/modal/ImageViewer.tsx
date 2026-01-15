import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");

export default function ImageViewer({
  isVisible,
  setIsVisible,
  url,
  // onDownload,
  onSetWallpaper,
}: any) {
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
    } catch (error) {
      console.log("Sharing error:", error);
      Alert.alert("Error", "Failed to share image");
    }
  };

  const onDownload = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Requiered",
        "If you want to download the image please allow permission to access library"
      );
      return;
    }
    const fileUri =
      FileSystem.documentDirectory + `wallpaper-${Date.now()}.jpg`;
    await FileSystem.downloadAsync(url, fileUri);
    await MediaLibrary.saveToLibraryAsync(fileUri);

    Alert.alert("Saved", "Image saved! Open gallery → Set as wallpaper");
  };
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={() => setIsVisible(false)}>
        <Pressable onPress={() => {}} style={styles.content}>
          <View style={styles.topBar}>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: url }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.actionBtn} onPress={onDownload}>
              <MaterialIcons name="file-download" size={26} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={onSharing}>
              <Ionicons name="share-social" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={onSetWallpaper}>
              <Ionicons name="image" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
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
