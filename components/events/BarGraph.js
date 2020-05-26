import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import { DateTime } from "luxon";
import { max } from "lodash";
import Svg, { Circle, Rect, G, Text } from "react-native-svg";
import { useThemeContext } from "../../config/ThemeContext";

const getLastXDaysFrom = ({ date, x }) => {
  const today = DateTime.fromJSDate(date);
  return Array.from(Array(x).keys())
    .reverse()
    .map((day) => today.minus({ days: day }).toFormat("yyyy-MM-dd"));
};

function eventsByDates({ endDate, numberOfDates, events }) {
  const dates = getLastXDaysFrom({ date: endDate, x: numberOfDates });
  return dates.map((date) => ({
    date,
    value: events.filter((e) =>
      DateTime.fromJSDate(e.date).hasSame(DateTime.fromSQL(date), "day")
    ).length,
  }));
}

function BarGraph({ tag, events, height, width, endDate, numberOfDates }) {
  const { sizes, colors, textStyles } = useThemeContext();

  const data = eventsByDates({ endDate, numberOfDates, events });
  const spacePerDate = width / numberOfDates + 1;
  let circleDiameter = height / max(data.map((d) => d.value));
  // constrain by horizontal space if needed
  circleDiameter = Math.min(circleDiameter, spacePerDate / 2);

  return (
    <Svg height={height} width={width}>
      <G x={0} y={height - 30}>
        {data.map((item, index) => (
          <G key={item.date} x={spacePerDate / 2 + spacePerDate * index}>
            {(function() {
              const elements = [];
              for (let i = 0; i < item.value; i++) {
                elements.push(
                  <Circle
                    key={item.date + i.toString()}
                    cx={0}
                    cy={circleDiameter * i * -1}
                    r={circleDiameter / 2 - 2}
                    fill={tag.color}
                  />
                );
              }
              return elements;
            })()}
            <Text
              key={item.date}
              textAnchor="start"
              y={30}
              x={-10}
              fontSize={16}
              fill={colors.darkText}
            >
              {DateTime.fromSQL(item.date).toFormat('d')}
            </Text>
          </G>
        ))}
      </G>
    </Svg>
  );
}

export default BarGraph;
