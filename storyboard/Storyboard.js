import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EventsListScreen from "./EventsListScreen";

const Stack = createStackNavigator();

function Storyboard({ tags, events, dispatch }) {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Events">
          {() => <EventsListScreen tags={tags} events={events} dispatch={dispatch} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Storyboard;
