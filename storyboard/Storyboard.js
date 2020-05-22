import React from "react";
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from 'expo-constants';
import { useThemeContext } from "../config/ThemeContext";
import EventsListScreen from "./EventsListScreen";
import AddTagScreen from "./AddTagScreen";
import EventDetailScreen from "./EventDetailScreen";

const Stack = createStackNavigator();

function Storyboard({ tags, events, dispatch }) {
  const theme = useThemeContext();
  const themeStatusBarStyle =
    theme.colorScheme === 'light' ? 'dark-content' : 'light-content';
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.bg0,
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <StatusBar barStyle={themeStatusBarStyle} />
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Events">
            {({ navigation }) => (
              <EventsListScreen
                tags={tags}
                events={events}
                dispatch={dispatch}
                navigation={navigation}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="AddTag">
            {({ navigation }) => (
              <AddTagScreen
                tags={tags}
                dispatch={dispatch}
                navigation={navigation}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="EventDetail">
            {({ navigation, route }) => (
              <EventDetailScreen
                tags={tags}
                events={events}
                dispatch={dispatch}
                navigation={navigation}
                route={route}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default Storyboard;
