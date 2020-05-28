import * as React from "react";
import { DateTime } from "luxon";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { useThemeContext } from "../../config/ThemeContext";

export interface IEvent {
  id: any;
  date: Date;
  tagId: any;
}

export interface Props {
  event: IEvent;
  tag: any;
  onPress: () => {};
}

function Event({ event, tag, onPress }: Props) {
  const { colors, textStyles, sizes } = useThemeContext();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={[
              textStyles.standard.dark,
              {
                fontWeight: "500",
                color: colors.lightText,
                textAlign: "right",
              },
            ]}
          >
            {DateTime.fromJSDate(event.date).toLocaleString(
              DateTime.TIME_SIMPLE
            )}
          </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <View style={{ backgroundColor: colors.bg2, width: 3, height: sizes.medium }} />
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              borderWidth: 5,
              borderColor: tag.color,
              marginVertical: 3,
              marginHorizontal: sizes.small,
            }}
          />
          <View style={{ backgroundColor: colors.bg2, width: 3, height: sizes.medium }} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[textStyles.standard.dark, { fontWeight: "500" }]}>
            {tag.name}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Event;
