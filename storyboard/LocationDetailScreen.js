import React from "react";
import LocationDetail from "../components/events/LocationDetail";
import NavWrapper from "../components/common/NavWrapper";

export default function AddTagScreen({ tags, events, dispatch, navigation, route }) {
  const selectedEvent = events.find(e => e.id === route.params.eventId);
  return (
    <NavWrapper navigation={navigation} title="Insights">
      <LocationDetail
        event={selectedEvent}
        events={events}
        tag={tags.find(t => t.id === selectedEvent.tagId)}
      />
    </NavWrapper>
  );
}
