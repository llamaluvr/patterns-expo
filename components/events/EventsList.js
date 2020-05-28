import React, { useContext } from "react";
import { View, Text, SectionList } from "react-native";
import { DateTime } from "luxon";
import { sortBy, groupBy, keys } from "lodash";
import Event from "./Event";
import { useThemeContext } from "../../config/ThemeContext";
import { jsDateToDateString } from "../../lib/dates";

function EventsList({ events, tags, onPressEvent }) {
  const { colors, textStyles, sizes } = useThemeContext();

  const groupByDay = groupBy(events, (e) => jsDateToDateString(e.date));
  const sections = sortBy(keys(groupByDay))
    .reverse()
    .map((day) => {
      const eventsForDay = groupByDay[day];
      return {
        data: sortBy(eventsForDay, (e) => e.date).reverse(),
        title: day,
      };
    });

  return (
    <View style={{ flex: 1, paddingBottom: 130, backgroundColor: colors.bg0 }}>
      <SectionList
        sections={sections}
        renderItem={({ item }) => (
          <Event
            event={item}
            tag={tags.find((t) => t.id === item.tagId)}
            onPress={() => onPressEvent(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        renderSectionFooter={({ section }) => (
          <View style={{ flexDirection: 'row'}}>
              <Text
                style={[
                  textStyles.small.dark,
                  { fontWeight: "bold", color: colors.lightText, flex: 1 },
                ]}
              >
                {`  ${DateTime.fromISO(section.title)
                  .toFormat("MMM d, yyyy")
                  .toUpperCase()} `}
                <Text style={{ fontWeight: "bold", color: colors.darkText }}>
                  {DateTime.fromISO(section.title)
                    .toFormat("cccc")
                    .toUpperCase()}
                </Text>
              </Text>
            <View style={{ width: 3, height: '100%', backgroundColor: colors.bg2 }} />
            <View style={{ flex: 1 }} />
          </View>
        )}
        inverted
      />
    </View>
  );
}

export default EventsList;
