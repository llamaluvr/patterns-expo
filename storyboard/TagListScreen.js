import * as React from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants';
import { TagList } from '../components';

const tags = [
  {
    name: 'blah',
  },
  {
    name: 'boo',
  },
  {
    name: 'derr',
  },
  {
    name: 'dag',
  },
]

export default function TagListScreen() {
  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <TagList tags={tags} />
    </View>
  );
}