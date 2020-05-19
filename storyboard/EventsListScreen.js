import React from 'react';
import { View, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { EventsList, TagAdder } from '../components';
import { useThemeContext } from "../config/ThemeContext";

export default function EventsListScreen({ tags, events, dispatch }) {
  // this is not the best place for the status bar stuff, but I set the status bar padding here so it's here for now
  const theme = useThemeContext();
  const themeStatusBarStyle =
    theme.colorScheme === 'light' ? 'dark-content' : 'light-content';
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg0, paddingTop: Constants.statusBarHeight }}>
      <StatusBar barStyle={themeStatusBarStyle} />
      <EventsList events={events} tags={tags} />
      <TagAdder tags={tags} onPressAddEvent={tagId => dispatch({ type: 'addEvent', payload: { id: events.length, tagId, date: new Date() }})} />
    </View>
  );
}