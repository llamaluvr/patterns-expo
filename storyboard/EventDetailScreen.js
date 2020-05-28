import React from "react";
import EventDetail from "../components/events/EventDetail";
import NavWrapper from "../components/common/NavWrapper";

export default function AddTagScreen({ tags, events, dispatch, navigation, route }) {
  const selectedEvent = events.find(e => e.id === route.params.eventId);
  return (
    <NavWrapper navigation={navigation} title="Location">
      <EventDetail
        tag={tags.find(t => t.id === selectedEvent.tagId)}
        events={events}
        selectedEvent={selectedEvent}
        onPressLocation={() => navigation.navigate('LocationDetail', { eventId: route.params.eventId })}
        onUpdateDate={date => { dispatch({ type: 'updateEvent', payload: { id: selectedEvent.id, date}})}}
      />
    </NavWrapper>
  );
}
