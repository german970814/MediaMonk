import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

export type Theme = {
  textColor: string;
  errorColor: string;
  accentColor: string;
  primaryColor: string;
  warningColor: string;
  borderRadius: number;
  contrastColor: string;
  backgroundColor: string;
  textAccentColor: string;
  accentColorLight: string;
  textInactiveColor: string;
  textColorSecondary: string;
  backgroundColorDark: string;
  backgroundColorLight: string;
  APP_HORIZONTAL_SPACE: number;
};

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function buildStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  styles: T | NamedStyles<T>
): T {
  return StyleSheet.create(styles);
}

export function getConstants(): Theme {
  return {
    borderRadius: 16,
    textColor: "#000000",
    errorColor: "#FF7171",
    accentColor: "#1A5CF5",
    primaryColor: "#4B4AFF",
    warningColor: "#F79E1B",
    contrastColor: "#34354D",
    APP_HORIZONTAL_SPACE: 20,
    textAccentColor: "#5F95FF",
    accentColorLight: "#80A9FF",
    textInactiveColor: "#CED4DD",
    textColorSecondary: "#6E7D94",
    backgroundColorDark: "#2A2A3E",
    backgroundColorLight: "#2D2D43",
    backgroundColor: "rgba(248, 249, 255, 1)",
  };
}
