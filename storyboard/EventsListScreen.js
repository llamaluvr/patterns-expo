import React from "react";
import { View } from "react-native";
import EventsList from "../components/events/EventsList";
import TagDrawer from "../components/TagDrawer";

export default function EventsListScreen({ tags, events, dispatch, navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <EventsList events={events} tags={tags} onPressEvent={event => navigation.navigate('EventDetail', { eventId: event.id })} />
      <TagDrawer
        tags={tags}
        onPressAddEvent={(tagId) =>
          dispatch({
            type: "addEvent",
            payload: { id: events.length, tagId, date: new Date() },
          })
        }
        onPressAddTag={() => navigation.navigate('AddTag')}
      />
    </View>
  );
}
