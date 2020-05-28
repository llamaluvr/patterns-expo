import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from "react-native";
import { DateTime } from "luxon";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useThemeContext } from "../../config/ThemeContext";
import BarGraph from "./BarGraph";

function IconButton({ icon, text, onPress }) {
  const { sizes, colors, textStyles } = useThemeContext();
  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
          {icon}
          <Text style={[textStyles.standard.dark, { textAlign: "center" }]}>
            {text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

function EventDetail({ events, tag, selectedEvent, onPressLocation, onUpdateDate }) {
  const { sizes, colors, textStyles } = useThemeContext();
  const [ isDatePickerVisible, setIsDatePickerVisible ] = useState(false);

  console.log(selectedEvent);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: colors.bg0 }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: sizes.large,
        }}
      >
        <View
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            borderColor: tag.color,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: tag.color,
          }}
        >
          <Text style={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
            {tag.name[0] + tag.name[1]}
          </Text>
        </View>
        <Text style={[textStyles.standard.dark, { marginTop: sizes.medium }]}>
          {tag.name}
        </Text>
        <View
          style={{
            marginTop: sizes.large,
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <IconButton
            icon={
              <AntDesign name="calendar" size={40} color={colors.darkText} />
            }
            onPress={() => { setIsDatePickerVisible(true)}}
            text={DateTime.fromJSDate(selectedEvent.date).toFormat(
              "MMM d, yyyy\nh:mm a"
            )}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            date={selectedEvent.date}
            onConfirm={date => { onUpdateDate(date); setIsDatePickerVisible(false) }}
            onCancel={() => setIsDatePickerVisible(false)}
          />
          <IconButton
            icon={
              <MaterialCommunityIcons
                name="map-marker"
                size={40}
                color={colors.darkText}
              />
            }
            onPress={selectedEvent.address ? onPressLocation : () => {}}
            text={
              selectedEvent.address
                ? selectedEvent.address[0].name +
                  "\n" +
                  selectedEvent.address[0].city
                : "???"
            }
          />
        </View>
        <View style={{ marginTop: sizes.large, alignItems: "center" }}>
          <BarGraph
            tag={tag}
            events={events.filter((e) => e.tagId === tag.id)}
            height={300}
            width={Dimensions.get("window").width - sizes.medium * 2}
            numberOfDates={7}
            endDate={new Date()}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default EventDetail;
