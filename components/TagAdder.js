import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { useThemeContext } from "../config/ThemeContext";

// inner list of tags that pops up
function TagList({ tags, onPressAddEvent }) {
  const theme = useThemeContext();

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        paddingTop: 5,
        paddingBottom: 30,
        paddingHorizontal: 15,
        justifyContent: 'space-evenly',
        flexWrap: "wrap"
      }}
    >
      {tags.map((tag) => (
        <View
          key={tag.id}
          style={{ justifyContent: "center", alignItems: "center", marginHorizontal: 20, marginBottom: 10, width: 75 }}
        >
          <TouchableWithoutFeedback onPress={() => onPressAddEvent(tag.id)}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                borderColor: tag.color,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: tag.color,
              }}
            >
              <Text style={{ fontSize: 30, color: "white" }}>
                {tag.name[0] + tag.name[1]}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={theme.textStyles.standard.dark}>{tag.name}</Text>
        </View>
      ))}
    </View>
    //{onPressAddEvent(); setIsTrayOpen(false)}
  );
}

function RoundButton({ icon, onPress }) {
  const theme = useThemeContext();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 25,
          borderColor: theme.colors.darkText,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>{icon}</View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// the entire component
// absolutely positioned over the event list so it can expand on top of it
function TagAdder({ tags, onPressAddEvent }) {
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const theme = useThemeContext();

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        borderTopWidth: 1,
        borderTopColor: theme.colors.darkText,
        backgroundColor: theme.colors.bg0,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 30,
        }}
      >
        {isTrayOpen ? (
          <TagList
            tags={tags}
            onPressAddEvent={(id) => {
              setIsTrayOpen(false);
              onPressAddEvent(id);
            }}
          />
        ) : null}
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <RoundButton
            onPress={() => {}}
            icon={
              <Text style={{ fontSize: 30, color: theme.colors.darkText }}>
                {isTrayOpen ? "✎" : "⚙"}
              </Text>
            }
          />
          <RoundButton
            onPress={() => {
              setIsTrayOpen(!isTrayOpen);
            }}
            icon={
              <Text style={{ fontSize: 30, color: theme.colors.darkText }}>
                {isTrayOpen ? "x" : "+"}
              </Text>
            }
          />
          <RoundButton
            onPress={() => {}}
            icon={
              <Text style={{ fontSize: 30, color: theme.colors.darkText }}>
                {isTrayOpen ? "+" : "🔍"}
              </Text>
            }
          />
        </View>
      </View>
    </View>
  );
}

export default TagAdder;
