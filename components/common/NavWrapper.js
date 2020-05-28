import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useThemeContext } from "../../config/ThemeContext";
import { AntDesign } from "@expo/vector-icons";

export default function NavWrapper({
  navigation,
  title = "",
  children,
  rightButton,
}) {
  const theme = useThemeContext();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg0 }}>
      <View
        style={{
          position: "absolute",
          right: theme.sizes.medium,
          left: theme.sizes.medium,
          top: theme.sizes.small,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={theme.textStyles.large.bold}>{title}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: theme.sizes.medium,
          paddingVertical: theme.sizes.small,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View>
            <AntDesign name="arrowleft" size={25} color={theme.colors.darkText} />
          </View>
        </TouchableOpacity>
        {rightButton ? (
          <TouchableOpacity onPress={rightButton.onPress}>
            <View>
              <Text style={[theme.textStyles.large.dark]}>
                {rightButton.title}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      {children}
    </View>
  );
}
