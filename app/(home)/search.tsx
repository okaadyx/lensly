import ImageViewer from "@/components/modal/ImageViewer";
import { api } from "@/services";
import { Ionicons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

export default function SearchScreen() {
  const query = useSelector((state: any) => state.query.query);

  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);

  const searchQueryResult = useInfiniteQuery({
    queryKey: ["searchImages", query],
    queryFn: ({ pageParam = 1 }) => api.image.searchImages(query, pageParam),
    initialPageParam: 1,
    enabled: !!query.trim(),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return pages.length + 1;
    },
  });

  const searchData = searchQueryResult.data?.pages.flat() ?? [];

  const isSearching =
    searchQueryResult.isLoading || searchQueryResult.isFetching;

  const hasSearched = query.trim().length > 0 && !isSearching;

  if (!query.trim()) {
    return (
      <View style={styles.emptyQuery}>
        <Ionicons name="search-outline" size={80} color="#6B7280" />
        <View style={styles.container}>
          <Text style={styles.emptyText}>Start typing to search</Text>
          <Text style={styles.containerText}>
            Search for wallpapers, images, or styles you love
          </Text>
        </View>
      </View>
    );
  }

  if (isSearching && searchData.length === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (hasSearched && searchData.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No Image Found</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={searchData}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        onEndReached={() =>
          searchQueryResult.hasNextPage && searchQueryResult.fetchNextPage()
        }
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          searchQueryResult.isFetchingNextPage ? (
            <ActivityIndicator size="large" />
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
              setImageUrl(item.largeImageURL);
              setImageId(item.id);
            }}
          >
            <Image source={{ uri: item.largeImageURL }} style={styles.image} />
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
  image: {
    height: 190,
    width: 190,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: 300,
    marginTop: 10,
  },
  containerText: {
    color: "#6B7280",
    textAlign: "center",
  },
  emptyQuery: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 20,
    textAlign: "center",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
});
