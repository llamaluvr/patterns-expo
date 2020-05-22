import React from "react";
import { View, Text } from "react-native";
import { useThemeContext } from "../../config/ThemeContext";

function EventDetail({ events, tags, selectedEventId }) {
  const theme = useThemeContext();

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.bg0 }}
    >
      <Text style={theme.textStyles.standard.dark}>{`Selected event with ID ${selectedEventId}`}</Text>
    </View>
  );
}

export default EventDetail;
