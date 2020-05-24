import React, { useReducer } from "react";
import * as Location from "expo-location";
import Storyboard from "./Storyboard";
import ThemeProvider from "../config/ThemeContext";

const notToday = new Date("2020-05-20T03:24:00");
const alsoNotToday = new Date("2020-05-19T03:24:00");

const defaultEvents = [
  {
    id: 0,
    tagId: 0,
    date: notToday,
  },
  {
    id: 1,
    tagId: 1,
    date: notToday,
  },
  {
    id: 2,
    tagId: 2,
    date: notToday,
  },
  {
    id: 3,
    tagId: 1,
    date: notToday,
  },
  {
    id: 4,
    tagId: 1,
    date: alsoNotToday,
  },
  {
    id: 5,
    tagId: 2,
    date: alsoNotToday,
  },
  {
    id: 6,
    tagId: 1,
    date: alsoNotToday,
  },
];

const defaultTags = [
  {
    id: 0,
    color: "blue",
    name: "Saw a spider",
  },
  {
    id: 1,
    color: "orange",
    name: "Ate Doritos",
  },
  {
    id: 2,
    color: "green",
    name: "Sega!",
  },
  {
    id: 3,
    color: "red",
    name: "Super Nintendo!",
  },
  {
    id: 4,
    color: "yellow",
    name: "Buuuuuurp!",
  },
  {
    id: 5,
    color: "pink",
    name: "Inner peace",
  },
];

// adds async functionality to any 
function dispatchMiddleware(dispatch) {
  return async (action) => {
    switch (action.type) {
      case "addEvent":
        // execute actual dispatch to create new event
        dispatch(action);
        // execute updating location after initial create
        let { status } = await Location.requestPermissionsAsync();
        let location = null;
        if (status !== "granted") {
          console.log("Location permission denied!");
        } else {
          location = await Location.getCurrentPositionAsync({});
          let address = await Location.reverseGeocodeAsync(location.coords);
          const newAction = { type: 'updateEvent', payload: { id: action.payload.id, location, address }};
          dispatch(newAction);
        }
        break;
      default:
        return dispatch(action);
    }
  };
}

// only includes actual modifications to state
function reducer(state, action) {
  switch (action.type) {
    case "addEvent":
      return { ...state, events: state.events.concat([action.payload]) };
    case "addTag":
      return { ...state, tags: state.tags.concat([action.payload]) };
    case "updateEvent":
      return {
        ...state,
        events: state.events.map((e) =>
          // acts like a patch
          e.id === action.payload.id ? { ...e, ...action.payload } : e
        ),
      };
    default:
      throw new Error();
  }
}

function StoryboardDataWrapper() {
  const [state, dispatch] = useReducer(reducer, {
    events: defaultEvents,
    tags: defaultTags,
  });

  return (
    <ThemeProvider>
      <Storyboard {...state} dispatch={dispatchMiddleware(dispatch)} />
    </ThemeProvider>
  );
}

export default StoryboardDataWrapper;
