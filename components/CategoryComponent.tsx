import { PIXABAY_CATEGORIES } from "@/constants/category";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoryComponent = () => {
  const [select, setSelect] = useState<string | null>(null);
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={PIXABAY_CATEGORIES}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelect(item.id)}>
            <View
              style={{
                height: 40,
                width: 100,
                backgroundColor: item?.id === select ? "green" : "white",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: item.id === select ? "white" : "black" }}>
                {item.label}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ gap: 10, padding: 8 }}
      />
    </View>
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({});
