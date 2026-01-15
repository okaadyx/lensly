import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
  onSubmit?: () => void;
};

const SearchComponent = ({ value, onChange, onSubmit }: Props) => {
  const showClear = value.trim().length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Ionicons name="search" size={18} color="gray" />

        <TextInput
          style={styles.input}
          placeholder="Search here"
          placeholderTextColor="gray"
          value={value}
          onChangeText={onChange}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          autoCorrect={false}
          // clearButtonMode="never"
        />

        {showClear && (
          <TouchableOpacity
            onPress={() => onChange("")}
            hitSlop={8}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={18} color="gray" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "98%",
    paddingHorizontal: 10,
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
    color: "black",
    backgroundColor: "white",
  },
  clearButton: {
    paddingLeft: 6,
  },
});
