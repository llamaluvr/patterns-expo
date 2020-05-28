import React, { useContext } from "react";
import { useColorScheme } from 'react-native-appearance';
import { Platform } from "react-native";

const getTheme = (colorScheme) => {
  const colors = {
    bg0: colorScheme === "dark" ? "#37414A" : "#f5f5f5",
    bg1: colorScheme === "dark" ? "#4B5962" : "white",
    bg2: colorScheme === "dark" ? "#61737F" : "gray",
    darkText: colorScheme === "dark" ? "white" : "black",
    lightText: colorScheme === "dark" ? "#79858F" : "#61737F",
    tagBlue: '#0084C9',
    tagPurple: '#AD4E9A',
    tagGreen: '#00B458',
    tagYellow: '#FFD300',
    tagOrange: '#FF920A',
    tagRed: '#FF581A',
  };

  const textStyles = {
    small: {
      dark: {
        fontSize: 13,
        color: colors.darkText,
        fontWeight: 'normal',
      },
      bold: {
        fontSize: 16,
        color: colors.darkText,
        fontWeight: '500',
      },
    },
    standard: {
      dark: {
        fontSize: 16,
        color: colors.darkText,
        fontWeight: 'normal',
      },
      bold: {
        fontSize: 16,
        color: colors.darkText,
        fontWeight: '500',
      },
    },
    large: {
      dark: {
        fontSize: 22,
        color: colors.darkText,
        fontWeight: 'normal',
      },
      bold: {
        fontSize: 22,
        color: colors.darkText,
        fontWeight: '500',
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
