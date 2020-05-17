import * as React from 'react';
import { SectionList } from 'react-native';
import Tag, { ITag } from './Tag';

export interface Props {
  tags: ITag[];
}

function TagList({ tags }: Props) {
  return (
    <SectionList sections={[{ data: tags, renderItem: ({ item }) => <Tag tag={item} />}]} keyExtractor={(item: ITag) => item.id} />
  )
}

export default TagList;
