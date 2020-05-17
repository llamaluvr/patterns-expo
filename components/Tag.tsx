import * as React from 'react';
import { View, Text } from 'react-native';

export interface ITag {
  name: string;
  id: any;
  date: Date;
  color: string;
}

export interface Props {
  tag: ITag,
}

function Tag({ tag }: Props) {
  return (
    <View>
      <Text>{tag.name}</Text>
    </View>
  )
}

export default Tag;
