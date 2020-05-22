import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeContext } from '../../config/ThemeContext'; 

export default function NavWrapper({ navigation, children }) {
  const theme = useThemeContext();

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.bg0 }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View>
          <Text style={[{ paddingTop: theme.sizes.small, paddingLeft: theme.sizes.medium }, theme.textStyles.standard.dark, { fontSize: 30 }]}>{`◄`}</Text>
        </View>
      </TouchableOpacity>
      {children}
    </View>
  );
}