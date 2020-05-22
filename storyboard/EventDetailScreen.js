import React from "react";
import EventDetail from "../components/events/EventDetail";
import NavWrapper from "../components/common/NavWrapper";

export default function AddTagScreen({ tags, events, dispatch, navigation, route }) {
  return (
    <NavWrapper navigation={navigation}>
      <EventDetail
        tags={tags}
        events={events}
        selectedEventId={route.params.eventId}
      />
    </NavWrapper>
  );
}
