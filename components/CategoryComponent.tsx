import { PIXABAY_CATEGORIES } from "@/constants/category";
import React from "react";
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
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={Object.values(PIXABAY_CATEGORIES)}
        keyExtractor={(item) => item.id}
        extraData={selectedCategory}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedCategory;

          return (
            <TouchableOpacity
              onPress={() => onSelectCategory(item.id)}
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
