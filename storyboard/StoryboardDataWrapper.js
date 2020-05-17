import React, { useReducer } from 'react';
import Storyboard from './Storyboard';

const defaultEvents = [
  {
    id: 0,
    tagId: 0,
    date: new Date(),
  },
  {
    id: 1,
    tagId: 1,
    date: new Date(),
  },
  {
    id: 2,
    tagId: 2,
    date: new Date(),
  },
  {
    id: 3,
    tagId: 1,
    date: new Date(),
  },
];

const defaultTags = [
  {
    id: 0,
    color: 'blue',
    name: 'Saw a spider'
  },
  {
    id: 1,
    color: 'orange',
    name: 'Ate Doritos'
  },
  {
    id: 2,
    color: 'green',
    name: 'Sega!'
  }
]

function reducer(state, action) {
  switch (action.type) {
    case 'addEvent':
      return {...state, events: state.events.concat([action.payload])}
    default:
      throw new Error();
  }
}

function StoryboardDataWrapper() {
  const [state, dispatch] = useReducer(reducer, { events: defaultEvents, tags: defaultTags});

  return (
    <Storyboard {...state} dispatch={dispatch} />
  )
}

export default StoryboardDataWrapper;
