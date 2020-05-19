import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EventsListScreen from "./EventsListScreen";
import ThemeProvider from "../config/ThemeContext";

const Stack = createStackNavigator();

function Storyboard({ tags, events, dispatch }) {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Events">
            {() => (
              <EventsListScreen
                tags={tags}
                events={events}
                dispatch={dispatch}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default Storyboard;
