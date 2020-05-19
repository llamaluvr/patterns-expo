import React, { useContext } from "react";
import { useColorScheme } from 'react-native-appearance';
import { Platform } from "react-native";

const getTheme = (colorScheme) => {
  const colors = {
    bg0: colorScheme === "dark" ? "black" : "white",
    darkText: colorScheme === "dark" ? "white" : "black",
    lightText: colorScheme === "dark" ? "black" : "white",
  };

  const textStyles = {
    standard: {
      dark: {
        fontSize: 16,
        color: colors.darkText,
        fontWeight: 'normal',
      },
    },
  };

  return {
    sizes: {
      small: 8,
      medium: 18,
      large: 25,
    },
    colors,
    textStyles,
    colorScheme,
  };
};

export const ThemeContext = React.createContext(getTheme("light"));

export function useThemeContext() {
  return useContext(ThemeContext);
}

/**
 * Allows overlaying of an accessory input just above the keyboard.
 * Avoids bugs in iOS InputAccessoryView and enables use of an input accessory view on Android.
 */
export default function ThemeProvider({ children }) {
  const colorScheme = useColorScheme();
  return (
    <ThemeContext.Provider value={getTheme(colorScheme)}>
      {children}
    </ThemeContext.Provider>
  );
}
