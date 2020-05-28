import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { uniqBy } from "lodash";
import MapView, { Marker } from "react-native-maps";
import { useThemeContext } from "../../config/ThemeContext";

const mapStyle = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

function TagCircle({ tag, size, border }) {
  const { sizes, colors, textStyles } = useThemeContext();
  return (
    <View
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        borderColor: border ? colors.darkText : tag.color,
        borderWidth: border ? 3 : 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: tag.color,
      }}
    >
      <Text style={{ fontSize: size / 2, color: "white", fontWeight: "bold" }}>
        {tag.name[0] + tag.name[1]}
      </Text>
    </View>
  );
}

function LocationDetail({ event, tag, events }) {
  const { sizes, colors, textStyles } = useThemeContext();
  const initialRegion = {
    ...event.location.coords,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  // for future use for changing location when user updates location
  // WAIT, why does this slow scrolling down so much?
  //const [region, setRegion] = useState(initialRegion);

  const distinctLocations = uniqBy(
    events.filter((e) => e.tagId === tag.id),
    (e) => e.address !== event.address
  );

  return (
    <MapView style={mapStyle} initialRegion={initialRegion}>
      <Marker coordinate={event.location.coords}>
        <TagCircle tag={tag} size={30} border />
      </Marker>
      {distinctLocations
        .filter((e) => e.location)
        .map((event) => (
          <Marker key={event.id} coordinate={event.location.coords}>
            <TagCircle tag={tag} size={20} />
          </Marker>
        ))}
    </MapView>
  );
}

export default LocationDetail;
