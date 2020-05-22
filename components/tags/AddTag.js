import React from "react";
import { View, Text } from "react-native";
import { useThemeContext } from "../../config/ThemeContext";

function AddTag({ onPressAddTag, tags }) {
  const theme = useThemeContext();

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.bg0 }}
    >
      <Text style={theme.textStyles.standard.dark}>TODO</Text>
    </View>
  );
}

export default AddTag;
