import CategoryComponent from "@/components/CategoryComponent";
import ImageViewer from "@/components/modal/ImageViewer";
import { api } from "@/services";
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

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);

  const isSearching = !!searchQuery.trim();

  const feedQuery = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: ({ pageParam = 1 }) => api.image.fetchImages(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return pages.length + 1;
    },
  });

  const searchQueryResult = useInfiniteQuery({
    queryKey: ["searchImages", searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      api.image.searchImages(searchQuery, pageParam),
    initialPageParam: 1,
    enabled: !!searchQuery.trim(),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return pages.length + 1;
    },
  });
  const categoryQueryResult = useInfiniteQuery({
    queryKey: ["categoryImages", categoryQuery],
    queryFn: ({ pageParam = 1 }) =>
      api.image.fetchImagesFromCategory(categoryQuery, pageParam),
    initialPageParam: 1,
    enabled: !!categoryQuery.trim(),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return pages.length + 1;
    },
  });

  const feedData = feedQuery.data?.pages.flat() ?? [];

  const searchData = searchQueryResult.data?.pages.flat() ?? [];

  const categoryData = categoryQueryResult.data?.pages.flat() ?? [];

  const listData = searchQuery.trim()
    ? searchData
    : categoryQuery.trim()
      ? categoryData
      : feedData;

  const loadMore = () => {
    if (searchQuery.trim()) {
      searchQueryResult.hasNextPage && searchQueryResult.fetchNextPage();
    } else if (categoryQuery.trim()) {
      categoryQueryResult.hasNextPage && categoryQueryResult.fetchNextPage();
    } else {
      feedQuery.hasNextPage && feedQuery.fetchNextPage();
    }
  };

  return (
    <View style={{ marginBottom: 80 }}>
      <CategoryComponent
        selectedCategory={categoryQuery || null}
        onSelectCategory={(id) => {
          setCategoryQuery(id);
          setSearchQuery("");
        }}
      />

      {isSearching && searchData.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", marginTop: 40 }}>
          <Text style={{ color: "red", fontSize: 20 }}>No Image Found</Text>
        </View>
      ) : (
        <FlatList
          data={listData}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          refreshing={feedQuery.isRefetching}
          onRefresh={() => {
            setSearchQuery("");
            setCategoryQuery("");
            feedQuery.refetch();
          }}
          ListFooterComponent={
            feedQuery.isFetchingNextPage ||
            searchQueryResult.isFetchingNextPage ||
            categoryQueryResult.isFetchingNextPage ? (
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
              <Image
                source={{ uri: item.largeImageURL }}
                style={styles.image}
              />
            </TouchableOpacity>
          )}
        />
      )}

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
});
