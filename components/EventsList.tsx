import * as React from "react";
import { View, SectionList } from "react-native";
import { sortBy } from 'lodash';
import Event, { IEvent } from "./Event";

export interface Props {
  events: IEvent[];
  tags: any;
}

function EventsList({ events, tags }: Props) {
  return (
    <View style={{ flex: 1, paddingBottom: 150 }}>
      <SectionList
        sections={[
          { data: sortBy(events, e => e.date).reverse(), renderItem: ({ item }) => <Event event={item} tag={tags.find(t => t.id === item.tagId )} /> },
        ]}
        keyExtractor={(item: IEvent) => item.id}
        inverted
      />
    </View>
  );
}

export default EventsList;
