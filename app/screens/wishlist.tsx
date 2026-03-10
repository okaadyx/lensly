import Toast from "@/components/core/Toast";
import ImageViewer from "@/components/modal/ImageViewer";
import { queryClient } from "@/lib/QueryClient";
import { userApi } from "@/services/UserService";
import { Feather } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function WishlistScreen() {
  const isDark = useColorScheme() === "dark";
  const styles = getStyles(isDark);

  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => userApi.wishlist.getWishlist(),
  });

  const wishlistImages = data?.wishlist?.images ?? data?.images ?? [];

  const removeMutation = useMutation({
    mutationFn: (imageId: string) => userApi.wishlist.removeItem(imageId),
    onSuccess: () => {
      Toast("Image Removed From Wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: () => {
      Alert.alert("Failed", "Failed to remove item");
    },
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={styles.colors.text} />
      </View>
    );
  }

  if (isError) {
    const error = (data as any)?.response?.status;
    if (error === 404) {
      return (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
        </View>
      );
    }
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Failed to load wishlist</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {wishlistImages.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
        </View>
      ) : (
        <>
          <Text style={styles.header}>{wishlistImages.length} Items</Text>

          <FlatList
            data={wishlistImages}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.imageWrapper}>
                  <Pressable
                    onPress={() => {
                      setImageUrl(item.imageUrl);
                      setImageId(item.imageId);
                      setIsViewerVisible(true);
                    }}
                  >
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.image}
                    />
                  </Pressable>

                  <TouchableOpacity
                    style={[
                      styles.removeButton,
                      removeMutation.isPending && styles.disabledButton,
                    ]}
                    disabled={removeMutation.isPending}
                    onPress={() => removeMutation.mutate(item.imageId)}
                  >
                    <Feather name="x" size={14} color={styles.colors.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </>
      )}

      <ImageViewer
        isVisible={isViewerVisible}
        setIsVisible={setIsViewerVisible}
        url={imageUrl}
        imageId={imageId}
      />
    </View>
  );
}

const getStyles = (isDark: boolean) => {
  const colors = {
    background: isDark ? "#000" : "#fff",
    card: isDark ? "#111" : "#f5f5f5",
    text: isDark ? "#fff" : "#000",
    subText: isDark ? "#aaa" : "#666",
    buttonBg: isDark ? "#222" : "#fff",
    icon: isDark ? "#fff" : "#000",
  };

  return {
    colors,

    ...StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
      },

      center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      },

      header: {
        fontSize: 14,
        color: colors.subText,
        marginBottom: 12,
        fontWeight: "500",
      },

      text: {
        color: colors.text,
      },

      emptyText: {
        color: colors.subText,
      },

      row: {
        justifyContent: "space-between",
      },

      card: {
        width: "48%",
        marginBottom: 20,
      },

      imageWrapper: {
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: colors.card,
      },

      image: {
        width: "100%",
        height: 160,
        resizeMode: "cover",
      },

      removeButton: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: colors.buttonBg,
        alignItems: "center",
        justifyContent: "center",
        elevation: 2,
      },

      disabledButton: {
        opacity: 0.6,
      },
    }),
  };
};
