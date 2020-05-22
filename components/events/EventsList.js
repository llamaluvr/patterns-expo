import React, { useContext } from "react";
import { View, Text, SectionList } from "react-native";
import { DateTime } from "luxon";
import { sortBy, groupBy, keys } from "lodash";
import Event from "./Event";
import { useThemeContext } from "../../config/ThemeContext";
import { jsDateToDateString } from "../../lib/dates";

function EventsList({ events, tags, onPressEvent }) {
  const theme = useThemeContext();

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
    <View
      style={{ flex: 1, paddingBottom: 120, backgroundColor: theme.colors.bg0 }}
    >
      <SectionList
        sections={sections}
        renderItem={({ item }) => (
          <Event event={item} tag={tags.find((t) => t.id === item.tagId)} onPress={() => onPressEvent(item)} />
        )}
        keyExtractor={(item) => item.id}
        renderSectionFooter={({ section }) => (
          <View style={{ paddingHorizontal: theme.sizes.medium }}>
            <Text style={theme.textStyles.standard.dark}>{`${DateTime.fromISO(
              section.title
            )
              .toFormat("MMM d, yyyy")
              .toUpperCase()} ${DateTime.fromISO(section.title)
              .toFormat("cccc")
              .toUpperCase()}`}</Text>
          </View>
        )}
        inverted
      />
    </View>
  );
}

export default EventsList;
