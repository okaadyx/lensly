import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type WallpaperType = "lock" | "home" | "both";

export default function SetWallpaperBottomSheet({
  sheetRef,
  onSelect,
  onClose,
}: {
  sheetRef: React.RefObject<any>;
  onSelect: (type: WallpaperType) => void;
  onClose?: () => void;
}) {
  const snapPoints = useMemo(() => ["30%", "50%"], []);

  const handleOptionPress = useCallback(
    (type: WallpaperType) => {
      sheetRef.current?.close();

      onSelect(type);
    },
    [onSelect, sheetRef],
  );

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1 && onClose) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={true}
      enableOverDrag={false}
      enableHandlePanningGesture={true}
      enableContentPanningGesture={true}
      detached={true}
      bottomInset={0}
      onChange={handleSheetChange}
      backgroundStyle={styles.bg}
      handleIndicatorStyle={styles.handleIndicator}
      style={styles.sheet}
      containerStyle={styles.containerStyle}
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.dragArea}>
          <Text style={styles.title}>Set Wallpaper</Text>
        </View>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleOptionPress("lock")}
          activeOpacity={0.7}
        >
          <Text style={styles.option}>🔒 Lock Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleOptionPress("home")}
          activeOpacity={0.7}
        >
          <Text style={styles.option}>🏠 Home Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleOptionPress("both")}
          activeOpacity={0.7}
        >
          <Text style={styles.option}>🖼 Both Screens</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    zIndex: 9999,
  },
  containerStyle: {
    zIndex: 9999,
    elevation: 9999,
  },
  bg: { backgroundColor: "#1c1c1e" },
  handleIndicator: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 40,
    height: 4,
  },
  container: { padding: 20, flex: 1 },
  dragArea: {
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#fff",
  },
  optionButton: {
    paddingVertical: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  option: {
    fontSize: 16,
    color: "#fff",
  },
});
