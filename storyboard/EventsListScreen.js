import React from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants';
import { EventsList, TagAdder } from '../components';

export default function EventsListScreen({ tags, events, dispatch }) {

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <EventsList events={events} tags={tags} />
      <TagAdder tags={tags} onPressAddEvent={tagId => dispatch({ type: 'addEvent', payload: { id: events.length, tagId, date: new Date() }})} />
    </View>
  );
}