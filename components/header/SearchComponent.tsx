import { setQuery } from "@/store/querySlice";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const lightTheme = {
  text: "#18181B",
  placeholder: "#71717A",
  icon: "#71717A",
};

const darkTheme = {
  text: "#FFFFFF",
  placeholder: "#A1A1AA",
  icon: "#A1A1AA",
};

const SearchComponent = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: any) => state.query.query);
  const inputRef = useRef<TextInput>(null);

  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;

  const showClear = query.trim().length > 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => clearTimeout(timeout);
  }, []);

  const handleClear = () => {
    dispatch(setQuery(""));
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        value={query}
        onChangeText={(text) => dispatch(setQuery(text))}
        placeholder="Discover images and wallpapers"
        placeholderTextColor={theme.placeholder}
        style={[styles.input, { color: theme.text }]}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />

      {showClear && (
        <TouchableOpacity
          onPress={handleClear}
          hitSlop={8}
          style={styles.clearButton}
        >
          <Ionicons name="close-circle" size={18} color={theme.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontWeight: "400",
  },
  clearButton: {
    paddingLeft: 8,
  },
});
