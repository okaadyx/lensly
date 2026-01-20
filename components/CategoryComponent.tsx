import { PIXABAY_CATEGORIES } from "@/constants/category";
import React, { useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  selectedCategory: string | null;
  onSelectCategory: (id: string) => void;
};

const CategoryComponent = ({ selectedCategory, onSelectCategory }: Props) => {
  const listRef = useRef<FlatList>(null);

  const onSelectItem = (index: number, id: string) => {
    const isSame = selectedCategory === id;
    onSelectCategory(isSame ? "" : id);
    listRef.current?.scrollToIndex({
      index: isSame ? 0 : index,
      animated: true,
      viewPosition: 0.03,
    });
  };

  return (
    <View>
      <FlatList
        horizontal
        ref={listRef}
        showsHorizontalScrollIndicator={false}
        data={Object.values(PIXABAY_CATEGORIES)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        renderItem={({ item, index }) => {
          const isSelected = item.id === selectedCategory;

          return (
            <TouchableOpacity
              onPress={() => onSelectItem(index, item.id)}
              activeOpacity={0.8}
            >
              <View style={[styles.item, isSelected && styles.selectedItem]}>
                <Text style={[styles.text, isSelected && styles.selectedText]}>
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 8,
  },
  item: {
    height: 40,
    width: 100,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "green",
  },
  text: {
    color: "black",
  },
  selectedText: {
    color: "white",
    fontWeight: "600",
  },
});
