import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

function TagList({ tags, onPressAddEvent }) {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        paddingTop: 5,
        paddingBottom: 30,
        paddingHorizontal: 15,
      }}
    >
      {tags.map((tag) => (
        <View
          key={tag.id}
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
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
          <Text>{tag.name}</Text>
        </View>
      ))}
    </View>
    //{onPressAddEvent(); setIsTrayOpen(false)}
  );
}

function TagAdder({ tags, onPressAddEvent }) {
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        borderTopWidth: 1,
        borderTopColor: "black",
        backgroundColor: "white",
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
          <TagList tags={tags} onPressAddEvent={id => { setIsTrayOpen(false); onPressAddEvent(id);}} />
        ) : null}
        <TouchableWithoutFeedback
          onPress={() => {
            setIsTrayOpen(!isTrayOpen);
          }}
        >
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              borderColor: "black",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 30 }}>{isTrayOpen ? "x" : "+"}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

export default TagAdder;
