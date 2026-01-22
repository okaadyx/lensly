import { Image, StyleSheet, View, useColorScheme } from "react-native";

const ImageCollage = () => {
  const isDark = useColorScheme() === "dark";
  const images = [
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Image source={{ uri: images[0] }} style={styles.small} />
        <Image source={{ uri: images[1] }} style={styles.large} />
      </View>

      <View style={styles.row}>
        <Image source={{ uri: images[2] }} style={styles.large} />
        <Image source={{ uri: images[3] }} style={styles.small} />
      </View>

      {/* Overlay */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: isDark
              ? "rgba(0,0,0,0.55)"
              : "rgba(255,255,255,0.35)",
          },
        ]}
      />
    </View>
  );
};

export default ImageCollage;
const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  small: {
    flex: 1,
  },
  large: {
    flex: 1.4,
  },
});
