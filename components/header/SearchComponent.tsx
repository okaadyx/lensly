import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const SearchComponent = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={setValue}
        placeholder="Discover images and wallpapers"
        placeholderTextColor="#A1A1AA"
        style={styles.input}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    // fontSize: 18,
    fontWeight: "400",
    color: "#FFFFFF",
  },
});
