import React from "react";
import { View, Text, TextInput } from "react-native";
import { useThemeContext } from "../../config/ThemeContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function ColorCircle({ color, isSelected, onPress }) {
  const { sizes, textStyles, colors } = useThemeContext();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          backgroundColor: color,
          width: 50,
          height: 50,
          borderWidth: 3,
          borderColor: isSelected ? colors.darkText : color,
          borderRadius: 25,
        }}
      />
    </TouchableWithoutFeedback>
  );
}

function AddTag({ name, color, onChangeName, onChangeColor }) {
  const { sizes, textStyles, colors } = useThemeContext();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg0 }}>
      <View style={{ marginHorizontal: sizes.medium, marginTop: sizes.large }}>
        <Text style={textStyles.standard.dark}>Name</Text>
        <View
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors.darkText,
            marginTop: sizes.small,
            paddingHorizontal: 5,
          }}
        >
          <TextInput
            value={name}
            onChangeText={onChangeName}
            style={[
              {
                width: "100%",
                height: 30,
              },
              textStyles.standard.dark,
            ]}
          />
        </View>
        <Text style={[textStyles.standard.dark, { marginTop: sizes.medium }]}>Color</Text>
        <View
          style={{
            marginTop: sizes.small,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {[colors.tagBlue, colors.tagPurple, colors.tagGreen, colors.tagYellow, colors.tagOrange, colors.tagRed].map(
            (myColor) => (
              <ColorCircle
                key={myColor}
                color={myColor}
                isSelected={myColor === color}
                onPress={() => {
                  onChangeColor(myColor);
                }}
              />
            )
          )}
        </View>
      </View>
    </View>
  );
}

export default AddTag;
