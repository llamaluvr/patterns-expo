import React from "react";
import { View, Text } from "react-native";
import { useThemeContext } from "../../config/ThemeContext";

function EventDetail({ events, tag, selectedEvent }) {
  const { sizes, colors, textStyles } = useThemeContext();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg0 }}>
      <View style={{ alignItems: "center", justifyContent: "center", marginTop: sizes.large }}>
        <View
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            borderColor: tag.color,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: tag.color,
          }}
        >
          <Text style={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
            {tag.name[0] + tag.name[1]}
          </Text>
        </View>
        <Text
          style={[textStyles.standard.dark, { marginTop: sizes.medium }]}
        >{tag.name}</Text>
      </View>
    </View>
  );
}

export default EventDetail;
