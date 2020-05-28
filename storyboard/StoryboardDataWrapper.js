import React, { useReducer, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import * as Location from "expo-location";
import Storyboard from "./Storyboard";
import ThemeProvider from "../config/ThemeContext";

const notToday = new Date("2020-05-20T03:24:00");
const alsoNotToday = new Date("2020-05-19T03:24:00");

const colors = {
  tagBlue: "#0084C9",
  tagPurple: "#AD4E9A",
  tagGreen: "#00B458",
  tagYellow: "#FFD300",
  tagOrange: "#FF920A",
  tagRed: "#FF581A",
};

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
    color: colors.tagBlue,
    name: "Saw a spider",
  },
  {
    id: 1,
    color: colors.tagOrange,
    name: "Ate Doritos",
  },
  {
    id: 2,
    color: colors.tagGreen,
    name: "Sega!",
  },
  {
    id: 3,
    color: colors.tagRed,
    name: "Super Nintendo!",
  },
  {
    id: 4,
    color: colors.tagYellow,
    name: "Buuuuuurp!",
  },
  {
    id: 5,
    color: colors.tagPurple,
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
          const newAction = {
            type: "updateEvent",
            payload: { id: action.payload.id, location, address },
          };
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
    case "load":
      return { ...state, ...action.payload };
    case "addEvent":
      return { ...state, events: state.events.concat([action.payload]) };
    case "addTag":
      return {
        ...state,
        tags: state.tags.concat([action.payload]),
        // add tag at the same time
        // whoops... doesn't grab location
        events: state.events.concat([
          { id: state.events.length, tagId: action.payload.id, date: new Date() },
        ]),
      };
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
    events: [],
    tags: [],
  });

  const [isSaveReady, setIsSaveReady] = useState(false);

  useEffect(() => {
    (async function() {
      const data = {};
      data.tags = JSON.parse(await AsyncStorage.getItem("tags"));
      data.events = JSON.parse(await AsyncStorage.getItem("events"));
      if (!data.tags) {
        data.tags = [];
      }
      if (!data.events) {
        data.events = [];
      } else {
        // deserialize dates
        data.events = data.events.map((e) => ({
          ...e,
          date: new Date(e.date),
        }));
      }
      dispatch({ type: "load", payload: data });
      setIsSaveReady(true);
    })();
  }, []);

  useEffect(() => {
    if (isSaveReady) {
      (async function() {
        AsyncStorage.setItem("events", JSON.stringify(state.events));
        AsyncStorage.setItem("tags", JSON.stringify(state.tags));
      })();
    }
  }, [state, isSaveReady]);

  return (
    <ThemeProvider>
      <Storyboard {...state} dispatch={dispatchMiddleware(dispatch)} />
    </ThemeProvider>
  );
}

export default StoryboardDataWrapper;
