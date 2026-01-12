import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchComponentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchQuery: (query: string) => void;
}

const SearchComponent = ({
  searchQuery,
  handleSearchQuery,
  setSearchQuery,
}: SearchComponentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Ionicons name="search" size={18} color="gray" />

        <TextInput
          style={styles.input}
          placeholder="Search here"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => handleSearchQuery(searchQuery)}
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "98%",
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    borderRadius: 12,
    color: "black",
    backgroundColor: "white",
  },
});
