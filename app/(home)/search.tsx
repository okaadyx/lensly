import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Search() {
  const query = useSelector((state: any) => state.query.query);
  return (
    <View>
      <Text style={{ color: "red", fontSize: 20 }}>{query}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
