import ImageViewer from "@/components/modal/ImageViewer";
import { api } from "@/services/imageService";
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
  useWindowDimensions,
} from "react-native";
import { useSelector } from "react-redux";

export default function SearchScreen() {
  const query = useSelector((state: any) => state.query.query);

  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);

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

  const searchQueryResult = useInfiniteQuery({
    queryKey: ["searchImages", query],
    queryFn: ({ pageParam = 1 }) => api.image.searchImages(query, pageParam),
    initialPageParam: 1,
    enabled: !!query.trim(),
    getNextPageParam: (lastPage, pages) =>
      !lastPage || lastPage.length === 0 ? undefined : pages.length + 1,
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
    <View style={styles.screen}>
      <FlatList
        data={searchData}
        numColumns={numColumns}
        key={numColumns}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: H_PADDING,
          paddingBottom: 20,
          gap: GAP,
        }}
        columnWrapperStyle={{
          gap: GAP,
        }}
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
            activeOpacity={0.85}
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
  screen: {
    marginBottom: 30,
    marginTop: 10,
  },
  image: {
    borderRadius: 12,
    backgroundColor: "#eee",
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
