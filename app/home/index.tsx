import CategoryComponent from "@/components/CategoryComponent";
import ImageViewer from "@/components/modal/ImageViewer";
import useInternetStatus from "@/components/useInternetStatus";
import { queryClient } from "@/lib/QueryClient";
import { api } from "@/services/imageService";
import { userApi } from "@/services/UserService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function HomeScreen() {
  const [categoryQuery, setCategoryQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);
  const isOnline = useInternetStatus();

  const { width } = useWindowDimensions();

  const getNumColumns = (screenWidth: number) => {
    if (screenWidth >= 1024) return 4;
    if (screenWidth >= 768) return 3;
    return 2;
  };

  const numColumns = getNumColumns(width);
  const GAP = 10;
  const H_PADDING = 16;

  const imageSize =
    (width - H_PADDING * 2 - GAP * (numColumns - 1)) / numColumns;

  const feedQuery = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: ({ pageParam = 1 }) => api.image.fetchImages(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      !lastPage || lastPage.length === 0 ? undefined : pages.length + 1,
  });

  const categoryQueryResult = useInfiniteQuery({
    queryKey: ["categoryImages", categoryQuery],
    queryFn: ({ pageParam = 1 }) =>
      api.image.fetchImagesFromCategory(categoryQuery, pageParam),
    initialPageParam: 1,
    enabled: !!categoryQuery.trim(),
    getNextPageParam: (lastPage, pages) =>
      !lastPage || lastPage.length === 0 ? undefined : pages.length + 1,
  });

  const feedData = feedQuery.data?.pages.flat() ?? [];
  const categoryData = categoryQueryResult.data?.pages.flat() ?? [];
  const listData = categoryQuery.trim() ? categoryData : feedData;

  const loadMore = () => {
    if (categoryQuery.trim()) {
      categoryQueryResult.hasNextPage && categoryQueryResult.fetchNextPage();
    } else {
      feedQuery.hasNextPage && feedQuery.fetchNextPage();
    }
  };

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["wishlist"],
      queryFn: () => userApi.wishlist.getWishlist(),
    });
  });

  return (
    <View style={styles.container}>
      <CategoryComponent
        selectedCategory={categoryQuery || null}
        onSelectCategory={(id) => setCategoryQuery(id)}
      />
      {!isOnline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>You’re offline</Text>
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listData}
        numColumns={numColumns}
        key={numColumns}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: H_PADDING,
          paddingBottom: 20,
          gap: GAP,
        }}
        columnWrapperStyle={{
          gap: GAP,
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        refreshing={feedQuery.isRefetching}
        onRefresh={() => feedQuery.refetch()}
        ListFooterComponent={
          feedQuery.isFetchingNextPage ||
          categoryQueryResult.isFetchingNextPage ? (
            <ActivityIndicator size="large" />
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setIsVisible(true);
              setImageUrl(item.largeImageURL);
              setImageId(item.id);
            }}
          >
            <Image
              source={{ uri: item.largeImageURL }}
              style={[
                styles.image,
                {
                  width: imageSize,
                  height: imageSize,
                },
              ]}
            />
          </TouchableOpacity>
        )}
      />

      <ImageViewer
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        url={imageUrl || ""}
        imageId={imageId?.toString() || ""}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 80,
  },
  image: {
    borderRadius: 12,
  },
  offlineBanner: {
    backgroundColor: "#1d6ca7",
    padding: 8,
    marginBottom: 2,
    width: "100%",
    alignItems: "center",
  },
  offlineText: {
    color: "#e4e4e4",
    fontWeight: "600",
  },
});
