import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Dimensions, Platform } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { AntDesign } from '@expo/vector-icons';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { chunk } from "lodash";
import { useThemeContext } from "../config/ThemeContext";

// inner list of tags that pops up
function TagList({ tags, onPressAddEvent }) {
  const { sizes, textStyles, colors } = useThemeContext();
  const [tagPageIndex, setTagPageIndex] = useState(0);

  let tagChunks = chunk(tags, 6);
  if (tagChunks.length === 0) {
    tagChunks = [[]];
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg1 }}>
      <Carousel
        data={tagChunks}
        renderItem={({ item /* tag chunk */ }) => (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingTop: sizes.large,
              paddingBottom: sizes.medium,
              paddingHorizontal: sizes.medium,
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {item.map((tag) => (
              <View
                key={tag.id}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: '33.33%',
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => onPressAddEvent(tag.id)}
                >
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
                <Text style={[textStyles.standard.dark, { paddingBottom: sizes.large }]}>{tag.name}</Text>
              </View>
            ))}
          </View>
        )}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        onSnapToItem={(index) => setTagPageIndex(index)}
        inactiveSlideScale={1}
      />
      {tagChunks.length > 1 && (
        <Pagination
          dotsLength={tagChunks.length}
          activeDotIndex={tagPageIndex}
          containerStyle={{ backgroundColor: "transparent", paddingVertical: 0, paddingBottom: sizes.medium }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: "white",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      )}
    </View>
  );
}

function RoundButton({ icon, onPress, style, iconStyle }) {
  const { colors, sizes } = useThemeContext();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[{
          height: 60,
          width: 60,
          borderRadius: 30,
          borderColor: colors.darkText,
          backgroundColor: colors.bg0,
          alignItems: "center",
          justifyContent: "center",
        }, style]}
      >
        <View style={[{ alignItems: 'center', justifyContent: 'center'}, iconStyle ]}>{icon}</View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// the entire component
// absolutely positioned over the event list so it can expand on top of it
function TagDrawer({ tags, onPressAddEvent, onPressAddTag }) {
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const { sizes, colors, textStyles } = useThemeContext();

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.bg1,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: isTrayOpen ? 0 : sizes.large,
          paddingBottom: Platform.OS === 'ios' ? getBottomSpace() : sizes.large,
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
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: 'center'
          }}
        >
          <RoundButton
            onPress={() => {}}
            icon={
              <AntDesign name={isTrayOpen ? 'edit' : 'setting'} size={35} color={colors.darkText} />
            }
            iconStyle={{ marginBottom: -3}}
          />
          <RoundButton
            onPress={() => {
              setIsTrayOpen(!isTrayOpen);
            }}
            icon={
              <AntDesign name={isTrayOpen ? 'close' : 'plus'} size={40} color={colors.darkText} />
            }
            style={{
              height: 70,
              width: 70,
              borderRadius: 35,
              backgroundColor: colors.bg2
            }}
            iconStyle={{ marginBottom: -3}}
          />
          <RoundButton
            onPress={isTrayOpen ? onPressAddTag : () => {}}
            icon={
              <AntDesign name={isTrayOpen ? 'plus' : 'search1'} size={35} color={colors.darkText} />
            }
            iconStyle={{ marginBottom: -3}}
          />
        </View>
      </View>
    </View>
  );
}

export default TagDrawer;
