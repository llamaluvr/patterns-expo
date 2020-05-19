import * as React from 'react';
import { DateTime } from 'luxon';
import { View, Text } from 'react-native';
import { useThemeContext } from '../config/ThemeContext'; 

export interface IEvent {
  id: any;
  date: Date;
  tagId: any;
}

export interface Props {
  event: IEvent;
  tag: any;
}

function Event({ event, tag }: Props) {
  const theme = useThemeContext();

  return (
    <View style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <Text style={theme.textStyles.standard.dark}>{DateTime.fromJSDate(event.date).toLocaleString(DateTime.TIME_SIMPLE)}</Text>
      <View style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: tag.color, marginHorizontal: 10 }} />
      <Text style={theme.textStyles.standard.dark}>{tag.name}</Text>
    </View>
  )
}

export default Event;
